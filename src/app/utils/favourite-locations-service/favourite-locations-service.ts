import { Injectable } from "@angular/core";

@Injectable()
export class FavouriteLocationsService {
  readonly favouritesStorageName = "favouriteLocations";

  public getFavouriteLocationsIds(): Array<number>{
    return JSON.parse(localStorage.getItem(this.favouritesStorageName)) || new Array<number>();
  }

  public setFavouriteLocationsIds(locationsIds: Array<number>) {
    localStorage.setItem(this.favouritesStorageName, JSON.stringify(locationsIds));
  }

  public toggleLocation(favouriteLocationIds: Array<number>, toggledLocationId: number): Array<number> {
    var locationFavouriteIndex = favouriteLocationIds.indexOf(toggledLocationId);

    if (locationFavouriteIndex == -1) {
      favouriteLocationIds.push(toggledLocationId);
    }
    else {
      favouriteLocationIds.splice(locationFavouriteIndex, 1);
    }

    return favouriteLocationIds;
  }
}
