import { Injectable } from '@angular/core';

@Injectable()
export class SearchMapService {

  public lat: number = 39.952583;
  public lng: number = -75.165222;

  constructor() { }

  setLatLng(lat : number, lng : number){
    this.lat = lat;
    this.lng = lng;
    console.log('set position: ', this.lat, this.lng);
  }

}
