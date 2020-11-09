import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { FlightTable } from '../app/flight-details/flight-details.component';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  baseURL: string = 'http://nmflightapi.azurewebsites.net/api/flight';

  constructor(private http: HttpClient) { }


getFlights(flightVal): Observable<FlightTable>{
  return this.http.get<FlightTable>(this.baseURL, {
    params: new HttpParams().set('flightVal', flightVal)
  });
}
}
