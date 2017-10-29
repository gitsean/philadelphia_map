import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchMapService } from '../search-map.service';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SearchMapService ]
})
export class SearchComponentComponent implements OnInit {

  // public lat: number = 39.952583;
  // public lng: number = -75.165222;
  public zoom: number = 14;
  public searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public _searchMapService: SearchMapService
  ) {  }  

  clickity(event){
    console.log(event);
  }

  ngOnInit() {
    this.searchControl = new FormControl();
    this.setCurrentPosition(this._searchMapService.lat,this._searchMapService.lng);
    //load Places Autocomplete
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
          
          console.log('hit here too...', place.geometry.location.lat());

          //set latitude, longitude and zoom
          // this.lat = place.geometry.location.lat();
          // this.lng = place.geometry.location.lng();
          // this.zoom = 12;
          this.setCurrentPosition(place.geometry.location.lat(), place.geometry.location.lng());
        });
      });
    });
  }

  private setCurrentPosition(lat, lng) {
    console.log('called...');
    if ("geolocation" in navigator) {
      // this.lat = lat;
      // this.lng = lng;
      this.zoom = 12;
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('HONK : ', position.coords);
        // this.lat = position.coords.latitude;
        // this.lng = position.coords.longitude;
        
        this._searchMapService.setLatLng(lat, lng);
        // this.lat = position.coords.latitude;
        // this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

}
