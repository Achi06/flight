import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {FlightService} from '../flight.service';
import { MatSort } from '@angular/material/sort';

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
export class FlightDetailsComponent implements OnInit, AfterViewInit {
  Ele: FlightTable[];
  flightValues: any;
  flightsData: [];
  displayedColumns: string[] = ['AirlineLogoAddress', 'AirlineName', 'InboundFlightsDuration', 'OutboundFlightsDuration', 'Stops', 'TotalAmount'];
  dataSource;
  flightForm = this.fb.group({
    departCode: ['', [Validators.required, Validators.maxLength(3)]],
    arrivalCode: ['', [Validators.required, Validators.maxLength(3)]],
    departDate: ['', Validators.required],
    arrivalDate: ['', Validators.required]
  });
  show = false;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private fb: FormBuilder, private flightservice: FlightService) {
   }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<FlightTable>(this.Ele);
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onSubmit(): any{
    this.flightValues = this.flightForm.value;
    this.flightservice.getFlights(this.flightValues).subscribe(flights => {
      this.dataSource.data = flights;
      this.dataSource.sort = this.sort;
    });
    this.show = true;
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
