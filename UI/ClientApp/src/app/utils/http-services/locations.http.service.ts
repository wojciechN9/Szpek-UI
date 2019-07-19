import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.prod";
import { Location } from "../../admin/locations/location.type";
import { LocationCreate } from "../../admin/locations/location-create.type";
import { LocationDetails } from "../../admin/locations/locations-details/location-details.type";

@Injectable()
export class LocationsHttpService {
  private readonly apiEndpoint;
  constructor(private http: HttpClient) {
    this.apiEndpoint = environment.apiUrl;
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiEndpoint + 'Locations');
  }

  getLocationById(id: number): Observable<LocationDetails> {
    return this.http.get<LocationDetails>(this.apiEndpoint + 'Locations/' + id);
  }

  postLocation(location: LocationCreate): Observable<number> {
    return this.http.post<any>(this.apiEndpoint + 'Locations', location);
  }
}
