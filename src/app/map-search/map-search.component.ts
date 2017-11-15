import { Component, ElementRef, NgZone, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { } from 'googlemaps';
import { PolDataService } from '../poldata.service';
import { MapsAPILoader } from '@agm/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs/Rx';
import { SearchMapService } from '../search-map.service';

@Component({
  selector: 'map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css'],
  providers: [ PolDataService, SearchMapService ]
})
export class MapSearchComponent implements OnInit {

  zoom: number = 14;
  searchControl: FormControl;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  public coordinates: any;
  wardDataObject: Object;
  divisionDataObject: Object;
  subscription: Subscription;
  public mapStyles = [
    {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
      ]
    }
  ];

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
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

  ngOnInit() {
    this.getWardData();
    this.getDivisionData();
    this.subscription = this._searchMapService.navItem$
    .subscribe((item) => {
      this.coordinates = item;
    })
    this.searchControl = new FormControl();
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          let lat = place.geometry.location.lat();
          let lng = place.geometry.location.lng();
          
          this._searchMapService.setLatLng(lat, lng);

        });
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  wardStyle(feature) {
    return {
      fillColor: 'white',
      strokeColor: 'black',
      strokeWeight: 2,
      fillOpacity: .1,
      strokeOpacity: .4
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
