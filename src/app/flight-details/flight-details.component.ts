import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import {FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {FlightService} from '../flight.service';

export interface FlightTable {
AirlineLogoAddress: string;
AirlineName: string;
InboundFlightsDuration: string;
ItineraryId: string;
OutboundFlightsDuration: string;
Stops: number;
TotalAmount: number;
}


@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.less']
})
export class FlightDetailsComponent implements OnInit {
  Ele: FlightTable[];
  flightValues: any;
  flightsData: [];
  displayedColumns: string[] = ['AirlineLogoAddress', 'AirlineName', 'InboundFlightsDuration', 'OutboundFlightsDuration', 'Stops', 'TotalAmount'];
  dataSource;
  flightForm = this.fb.group({
    departCode: [''],
    arrivalCode: [''],
    departDate: [''],
    arrivalDate: ['']
  });
  show: boolean = false;


  constructor(private fb: FormBuilder, private flightservice: FlightService) { }

  ngOnInit(): void {
   this.dataSource= new MatTableDataSource<FlightTable>(this.Ele);
    console.log("dataSource", this.dataSource);
  }

  onSubmit(){
    
    this.flightValues = this.flightForm.value;
    this.flightservice.getFlights(this.flightValues).subscribe(flights =>{
      this.dataSource.data= flights
    });
    this.show = true;
    console.log("Response",this.dataSource);
  }
}
