import { Component, Input, OnInit } from '@angular/core';
import { LocationMeassurements } from '../location-meassurements/location-meassurements.type';

@Component({
  selector: 'location-meassurements-list',
  templateUrl: './location-meassurements-list.component.html'
})
export class LocationMeassurementsListComponent implements OnInit {
  @Input() locationsMeassurements: Array<LocationMeassurements>;
  favouritesIds: Array<number>;
  readonly favouritesStorageName = "favouriteLocations";

  ngOnInit(): void {
    this.sortByFavourites();
  }

  isFavourite(locationId: number) {
    if (this.favouritesIds == null) {
      return false;
    }
    if (this.favouritesIds.indexOf(locationId) === -1) {
      return false;
    }

    return true;
  }

  favouriteStatusChangedEvent(id: number) {
    var locationsMeassurementsFavouritesIds: Array<number> = JSON.parse(localStorage.getItem(this.favouritesStorageName)) || new Array<number>();
    var locationFavouriteIndex = locationsMeassurementsFavouritesIds.indexOf(id);

    if (locationFavouriteIndex == -1) {
      locationsMeassurementsFavouritesIds.push(id);
    }
    else {
      locationsMeassurementsFavouritesIds.splice(locationFavouriteIndex, 1);
    }

    localStorage.setItem(this.favouritesStorageName, JSON.stringify(locationsMeassurementsFavouritesIds));

    this.sortByFavourites();
  }

  sortByFavourites() {
    this.favouritesIds = JSON.parse(localStorage.getItem(this.favouritesStorageName));

    if (this.favouritesIds != null) {
      //show favourites first
      this.locationsMeassurements.sort((a, b) => {
        if (this.isFavourite(a.id) == this.isFavourite(b.id)) return 0;
        if (this.isFavourite(a.id)) return -1;
        return 1;
      });
    }
  }
}
