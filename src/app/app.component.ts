import { Component, OnInit } from '@angular/core';
import { PolDataService } from "./poldata.service";
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PolDataService]
})
 
export class AppComponent implements OnInit {
  title: string = 'Map of Philly Wards and Divisions';
  lat: number = 39.952583;
  lng: number = -75.165222;
  zoom: number = 14;
  wardDataObject: Object;
  divisionDataObject: Object;
 
  constructor(private _polDataService: PolDataService) {}
 
  // function to consume  observable
  getWardData(): void {
    this._polDataService.getWardData()
      .subscribe(resWardData => {
        this.wardDataObject = resWardData;
        console.log(this.wardDataObject);
      });
  }
  getDivisionData(): void {
    this._polDataService.getDivisionData()
      .subscribe(resDivisionData => {
        this.divisionDataObject = resDivisionData;
        console.log(this.divisionDataObject);
      });
  }
  // on init lifecycle hook
  // We get the GeoJSON here
  ngOnInit() : void {
    this.getWardData();
    this.getDivisionData();
  }

  clicked(event){
    console.log(event);
  }
 
  wardStyle(feature) {
    return {
      fillColor: 'white',
      strokeColor: 'black',
      strokeWeight: 2,
      fillOpacity: .1,
      strokeOpacity: .4,
      // zIndex: 2
    };
  }

  divisionStyle(feature) {
    return {
      icon: 'assets/images/door.png',
      fillColor: 'blue',
      fillOpacity: .1,
      strokeColor: 'blue',
      strokeWeight: 0.5,
      strokeOpacity: 0.5,
      zIndex:1
    };
  }
}