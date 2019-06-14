import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sensor-list',
  templateUrl: './sensor-list.component.html'
})
export class SensorListComponent implements OnInit {
  @Input() sensors: Array<Sensor>;
  sensorsFavouritesIds: Array<number>;
  readonly favouritesStorageName = "favouriteLocations";

  ngOnInit(): void {
    this.sortByFavourites();
  }

  isFavourite(locationId: number) {
    if (this.sensorsFavouritesIds.indexOf(locationId) === -1) {
      return false;
    }

    return true;
  }

  favouriteStatusChangedEvent(sensorId: number) {
    var sensorsFavouritesIds: Array<number> = JSON.parse(localStorage.getItem(this.favouritesStorageName)) || new Array<number>();
    var locationFavouriteIndex = sensorsFavouritesIds.indexOf(sensorId);

    if (locationFavouriteIndex == -1) {
      sensorsFavouritesIds.push(sensorId);
    }
    else {
      sensorsFavouritesIds.splice(locationFavouriteIndex, 1);
    }

    localStorage.setItem(this.favouritesStorageName, JSON.stringify(sensorsFavouritesIds));

    this.sortByFavourites();
  }

  sortByFavourites() {
    this.sensorsFavouritesIds = JSON.parse(localStorage.getItem(this.favouritesStorageName));

    //show favourites first
    this.sensors.sort((a, b) => {
      if (this.isFavourite(a.id) == this.isFavourite(b.id)) return 0;
      if (this.isFavourite(a.id)) return -1;
      return 1;
    });
  }
}
