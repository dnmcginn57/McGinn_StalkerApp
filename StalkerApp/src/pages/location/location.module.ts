import { ErrorHandler,NgModule } from '@angular/core';
import { IonicPageModule, IonicErrorHandler } from 'ionic-angular';
import { LocationPage } from './location';


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
