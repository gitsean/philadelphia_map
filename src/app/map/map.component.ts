import { Component, OnInit } from '@angular/core';
import { PolDataService } from '../poldata.service';
import { SearchMapService } from '../search-map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ PolDataService, SearchMapService ]
})
export class MapComponent implements OnInit {
  // lat: number = this._searchMapService.lat;
  // lng: number = this._searchMapService.lng;
  zoom: number = 14;
  wardDataObject: Object;
  divisionDataObject: Object;

  constructor(
    public _polDataService: PolDataService,
    public _searchMapService: SearchMapService
  ) { }

  // function to consume  observable
  getWardData(): void {
    this._polDataService.getWardData()
      .subscribe(resWardData => {
        this.wardDataObject = resWardData;
      });
  }
  getDivisionData(): void {
    this._polDataService.getDivisionData()
      .subscribe(resDivisionData => {
        this.divisionDataObject = resDivisionData;
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
