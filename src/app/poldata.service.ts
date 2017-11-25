import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class PolDataService {
 
  // location of GeoJSON file in server
  private _wardsUrl: string = 'assets/Political_Wards.geojson';
  private _divisionsUrl: string = 'assets/Political_Divisions.geojson';
 
  constructor(private _http: HttpClient) {}
 
  // fetch the file and parse the result as JSON
  getWardData() {
    return this._http.get(this._wardsUrl);
  }

  getDivisionData() {
    return this._http.get(this._divisionsUrl);
  }
}