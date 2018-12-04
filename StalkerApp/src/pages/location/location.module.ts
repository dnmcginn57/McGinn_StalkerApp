import { ErrorHandler,NgModule } from '@angular/core';
import { IonicPageModule, IonicErrorHandler } from 'ionic-angular';
import { LocationPage } from './location';

import { LocationTracker } from '../../providers/location-tracker/location-tracker';

import { Geolocation } from '@ionic-native/geolocation';
import { BrowserModule } from '@angular/platform-browser';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';


@NgModule({
  declarations: [
    LocationPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationPage),
    BrowserModule,
   
  ],
  providers: [
    LocationTracker,
    BackgroundGeolocation,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class LocationPageModule {}
