import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationModalComponent } from './location-modal/location-modal.component';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import { fromLonLat, getTransform } from 'ol/proj';
import { Style, Circle, Stroke, Fill } from 'ol/Style';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LayerVector from 'ol/layer/Vector';
import { createEmpty, extend } from 'ol/extent';
import Overlay from 'ol/overlay';
import { LocationMeassurements } from '../../location-meassurements/location-meassurements.type';
import { AirQualityEnum } from '../../location-meassurements/air-quality.type';
import { getAirQualityColor } from '../enum/air-quality';
import { getEnumValues } from '../enum/enum-conversion';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';


@Component({
  selector: 'map-factory',
  templateUrl: './map-factory.component.html',
  styleUrls: ['./map-factory.component.css']
})
export class MapFactoryComponent implements OnChanges, AfterViewInit {
  @Input() locationsMeassurements: LocationMeassurements[];
  @Input() modalOnClick?: boolean = true;
  @ViewChild(ProgressBarComponent)
  private progressBar: ProgressBarComponent;

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  popup: Overlay;
  tooltip: any;

  ngOnChanges() {
    this.createMap(this.locationsMeassurements);
  }

  ngAfterViewInit(): void {
    this.onSourceTitlesLoading();
  }

  constructor(
    private modalService: NgbModal) {
  }

  createMap(locationsMeassurements: LocationMeassurements[]) {
    this.source = new OlXYZ({
      url: 'https://tile.osm.org/{z}/{x}/{y}.png',
      attributions: ["Szpek.pl - I like it"],
      attributionsCollapsible: false
    });

    this.view = new OlView({
      center: fromLonLat([19.1227817, 52.2220688]),
      maxZoom: 15,
      zoom: 6
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    var locationLayers = this.getLocationLayers(locationsMeassurements);
    var layers = [this.layer].concat(locationLayers);

    this.map = new OlMap({
      target: 'map',
      layers: layers,
      view: this.view
    });

    if (locationsMeassurements.length !== 0) {
      this.fitToAllLocations(locationLayers);
    }

    if (this.modalOnClick) {
      this.createOnMapClickEvent();
    }

    this.createOnPointerMoveEvent();
  }

  createOnMapClickEvent() {
    this.map.on('singleclick', (evt) => {
      var feature = this.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        return feature;
      });

      if (feature) {
        const modalRef = this.modalService.open(LocationModalComponent);
        var featureProperties = feature.getProperties();
        modalRef.componentInstance.locationId = featureProperties.locationId;
        modalRef.componentInstance.address = featureProperties.address;
        modalRef.componentInstance.airQuality = featureProperties.airQuality;
        modalRef.componentInstance.pm10Value = featureProperties.pm10Value;
        modalRef.componentInstance.pm25Value = featureProperties.pm25Value;
        modalRef.componentInstance.periodTo = featureProperties.periodTo;
      }
    });
  }

  createOnPointerMoveEvent() {
    this.map.on('pointermove', (evt) => {
      var feature = this.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        return feature;
      });

      if (feature) {
        evt.map.getTargetElement().style.cursor = 'pointer';
      }
      else {
        evt.map.getTargetElement().style.cursor = '';
      }
    });
  }

  onSourceTitlesLoading() {
    this.source.on('tileloadstart', () => this.progressBar.addChange());
    this.source.on('tileloadend', () => this.progressBar.removeChange());
    this.source.on('tileloaderror', () => this.progressBar.error());
  }

  getLocationLayers(locationsMeassurements: LocationMeassurements[]) {
    var layers = new Array<LayerVector>();
    var transform = getTransform('EPSG:4326', 'EPSG:3857');

    for (let quality in getEnumValues(AirQualityEnum)) {
      var qualityLocations = locationsMeassurements.filter(l => l.meassurements[0].airQuality === +quality);

      if (qualityLocations.length !== 0) {
        var circleStyle = this.getCircleStyle(getAirQualityColor(+quality));
        var locationsSource = new VectorSource();

        for (var i = 0; i < qualityLocations.length; i++) {
          var feature = new Feature();
          var coordinate = transform([qualityLocations[i].address.longitude, qualityLocations[i].address.latitude]);
          var geometry = new Point(coordinate);
          feature.setGeometry(geometry);

          feature.setProperties(this.setFeatureProperties(qualityLocations[i]));
          locationsSource.addFeature(feature);
        }

        layers.push(
          new LayerVector({
            source: locationsSource,
            style: circleStyle
          }));
      }
    }

    return layers;
  }

  getCircleStyle(color: string) {
    return new Style({
      image: new Circle({
        radius: 8,
        stroke: new Stroke({
          color: 'darkblue',
          width: 3
        }),
        fill: new Fill({
          color: color
        })
      })
    });
  }

  setFeatureProperties(locationMeassurement: LocationMeassurements) {
    return {
      'locationId': locationMeassurement.id,
      'address': locationMeassurement.address.city + ', ' + locationMeassurement.address.street,
      'airQuality': locationMeassurement.meassurements[0].airQuality,
      'pm10Value': locationMeassurement.meassurements[0].pm10Value,
      'pm25Value': locationMeassurement.meassurements[0].pm25Value,
      'periodTo': locationMeassurement.meassurements[0].periodTo
    }
  }

  fitToAllLocations(locationsLayer: any[]) {
    var extent = createEmpty();
    for (var i = 0; i < locationsLayer.length; i++) {
      extend(extent, locationsLayer[i].getSource().getExtent());
    }

    this.map.getView().fit(extent, this.map.getSize());
  }
}
