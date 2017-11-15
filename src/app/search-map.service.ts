import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchMapService {

  // won't need this once we convert to BehaviorSubject
  // public lat: number = 39.952583;
  // public lng: number = -75.165222;

  private _position = new BehaviorSubject<object>({
    lat: 39.952583,
    lng: -75.165222
  });

  navItem$ = this._position.asObservable();

  constructor() { }

  setLatLng(lat : number, lng : number){
    console.log('service changing the behaviorsubject.')
    this._position.next({
      lat: lat,
      lng: lng
    });
  }

}
