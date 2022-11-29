import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationMeassurements } from '../../location-meassurements/location-meassurements.type';
import { environment } from '../../../environments/environment';
import { Measurement } from '../../location-meassurements/measurement.type';

@Injectable()
export class MeassurementsHttpService {
  private readonly apiEndpoint;
  constructor(private http: HttpClient) {
    this.apiEndpoint = environment.apiUrl;
  }

  getLocationsMeassures(): Observable<LocationMeassurements[]> {
    return this.http.get<LocationMeassurements[]>(this.apiEndpoint + 'Meassurements');
  }

  getLocationMeassure(id: number): Observable<LocationMeassurements> {
    return this.http.get<LocationMeassurements>(this.apiEndpoint + 'Meassurements/' + id);
  }

  getMeassurementsByDate(locationId: number, date: string) {
    return this.http.get<Array<Measurement>>(this.apiEndpoint + `Meassurements/${locationId}/${date}`);
  }
}
