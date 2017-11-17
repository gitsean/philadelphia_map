import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class CommitteePersonService {
 
  // location of GeoJSON file in server
  private _committeePersonUrl: string = '';
 
  constructor(private _http: HttpClient) {}
 
  // fetch the file and parse the result as JSON
  getCommitteePersonData(ward: number, division: number) {
    this._committeePersonUrl = `https://phl.carto.com/api/v2/sql?q=SELECT * FROM elected_committee_people WHERE ward = ${ward} AND division = ${division}`;
    return this._http.get(this._committeePersonUrl);
  }
  
}
