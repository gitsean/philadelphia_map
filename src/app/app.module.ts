import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { SearchComponentComponent } from './search-component/search-component.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponentComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCG_7VM4OEqhGkcaxucOGw53qSwbM0qyD8',
      libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
