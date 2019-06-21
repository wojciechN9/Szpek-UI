import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
import FullScreen from 'ol/control/FullScreen';
import { createEmpty, extend } from 'ol/extent';
import Overlay from 'ol/overlay';


@Component({
  selector: 'map-factory',
  templateUrl: './map-factory.component.html',
  styleUrls: ['./map-factory.component.css']
})
export class MapFactoryComponent implements OnChanges {
  @Input() locationsMeassurements: LocationMeassurements[];
  @Input() modalOnClick?: boolean = true;

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  popup: Overlay;
  tooltip: any;

  ngOnChanges() {
    this.createMap(this.locationsMeassurements);
  }

  constructor(
    private modalService: NgbModal) {
  }

  createMap(locationsMeassurements: LocationMeassurements[]) {
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.view = new OlView({
      center: fromLonLat([19.1227817, 52.2220688]),
      maxZoom: 15
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    var locationLayer = this.getLocationLayer(locationsMeassurements);

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer, locationLayer],
      view: this.view
    });

    var fullScreen = new FullScreen();
    this.map.addControl(fullScreen);

    if (locationsMeassurements.length !== 0) {
      this.fitToAllLocations(locationLayer);
    }

    if (this.modalOnClick) {
      this.createOnMapClickEvent();
    }
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
        modalRef.componentInstance.pm10Value = featureProperties.pm10Value;
        modalRef.componentInstance.pm25Value = featureProperties.pm25Value;
        modalRef.componentInstance.periodTo = featureProperties.periodTo;
      }
    });
  }

  getLocationLayer(locationsMeassurements: LocationMeassurements[]) {
    var circleStyle = new Style({
      image: new Circle({
        radius: 6,
        stroke: new Stroke({
          color: 'white',
          width: 2
        }),
        fill: new Fill({
          color: 'green'
        })
      })
    });

    var locationsSource = new VectorSource();
    var transform = getTransform('EPSG:4326', 'EPSG:3857');

    for (var i = 0; i < locationsMeassurements.length; i++) {
      var feature = new Feature();
      var coordinate = transform([locationsMeassurements[i].address.longitude, locationsMeassurements[i].address.latitude]);
      var geometry = new Point(coordinate);
      feature.setGeometry(geometry);

      feature.setProperties(this.setFeatureProperties(locationsMeassurements[i]));
      locationsSource.addFeature(feature);
    }

    return new LayerVector({
      source: locationsSource,
      style: circleStyle
    });
  }

  setFeatureProperties(locationMeassurement: LocationMeassurements) {
    return {
      'locationId': locationMeassurement.id,
      'address': locationMeassurement.address.city + ', ' + locationMeassurement.address.street,
      'pm10Value': locationMeassurement.meassurements[0].pm10Value,
      'pm25Value': locationMeassurement.meassurements[0].pm25Value,
      'periodTo': locationMeassurement.meassurements[0].periodTo
    }
  }

  fitToAllLocations(locationLayer) {
    var extent = createEmpty();
    extend(extent, locationLayer.getSource().getExtent());
    this.map.getView().fit(extent, this.map.getSize());
  }
}
