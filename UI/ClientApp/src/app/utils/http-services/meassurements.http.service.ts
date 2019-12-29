import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { LocationMeassurements } from '../../location-meassurements/location-meassurements.type';
import { LocationMeassurementsDetails } from '../../location-meassurements-details/location-meassurements-details.type';
import { Meassurement } from '../../location-meassurements/meassurement.type';

@Injectable()
export class MeassurementsHttpService {
  private readonly apiEndpoint;
  constructor(private http: HttpClient) {
    this.apiEndpoint = environment.apiUrl;
  }

  getLocationsMeassures(): Observable<LocationMeassurements[]> {
    return this.http.get<LocationMeassurements[]>(this.apiEndpoint + 'Meassurements');
  }

  getLocationsMeassuresDetails(id: number): Observable<LocationMeassurementsDetails> {
    return this.http.get<LocationMeassurementsDetails>(this.apiEndpoint + 'Meassurements/' + id);
  }

  getMeassurementsByDate(locationId: number, date: string) {
    return this.http.get<Array<Meassurement>>(this.apiEndpoint + `Meassurements/${locationId}/${date}`);
  }
}
