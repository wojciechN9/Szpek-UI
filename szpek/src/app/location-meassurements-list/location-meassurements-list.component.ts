import { Component, Input, OnInit } from '@angular/core';
import { LocationMeassurements } from '../location-meassurements/location-meassurements.type';
import { FavouriteLocationsService } from '../utils/favourite-locations-service/favourite-locations-service';


@Component({
  selector: 'location-meassurements-list',
  templateUrl: './location-meassurements-list.component.html'
})
export class LocationMeassurementsListComponent implements OnInit {
  @Input() locationsMeassurements: Array<LocationMeassurements>;
  favouritesIds: Array<number>;

  constructor(private favouriteLocations: FavouriteLocationsService) { }

  ngOnInit(): void {
    this.favouritesIds = this.favouriteLocations.getFavouriteLocationsIds();
    this.sortLocations();
  }

  isFavourite(locationId: number) {
    if (this.favouritesIds.indexOf(locationId) === -1) {
      return false;
    }

    return true;
  }

  favouriteStatusChangedEvent(id: number) {
    this.favouritesIds = this.favouriteLocations.toggleLocation(this.favouritesIds, id);

    this.favouriteLocations.setFavouriteLocationsIds(this.favouritesIds);

    this.sortLocations();
  }

  sortLocations() {
      //show favourites first and order by name
      this.locationsMeassurements.sort((a, b) => {
        if (this.isFavourite(a.id) === this.isFavourite(b.id)) {
          if (a.address.city < b.address.city) { return -1; }
          if (a.address.city > b.address.city) { return 1; }
          return 0;
        };
        if (this.isFavourite(a.id)) return -1;
        return 1;
      });

  }
}
