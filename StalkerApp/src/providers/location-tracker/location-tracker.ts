import { Injectable, NgZone } from '@angular/core';
//import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
// import 'rxjs/add/operator/filter';
import { filter } from 'rxjs/operators';
import { DatabaseProvider } from '../database/database';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class LocationTracker {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  //backgroundGeolocation: any;


  constructor(public zone: NgZone,private backgroundGeolocation: BackgroundGeolocation, public geolocation: Geolocation,
    private db: DatabaseProvider, private auth: AuthProvider, ) {
  }

  
  startTracking() {

    // Background Tracking

    // let config:any = {
    //   desiredAccuracy: 0,
    //   stationaryRadius: 20,
    //   distanceFilter: 10,
    //   debug: true,
    //   interval: 2000      
    // };

    // this.watch =this.backgroundGeolocation.configure(config).subscribe((location) => {

    //   console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

    //   // Run update inside of Angular's zone
    //   this.zone.run(() => {
    //     this.lat = location.latitude;
    //     this.lng = location.longitude;
    //   });

    // }, (err) => {

    //   console.log(err);

    // });

    // // Turn ON the background-geolocation system.
    // this.backgroundGeolocation.start();

    //background tracking
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      interval: 2000,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
};

this.backgroundGeolocation.configure(config)

.subscribe((location: BackgroundGeolocationResponse) => {

console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

//Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });

      this.db.userSetLoc(this.auth.uid, this.lat, this.lng);
    }, (err) => {

      console.log(err);

      //this.backgroundGeolocation.finish(); // FOR IOS ONLY

});

//Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();


    // Foreground Tracking

    let options: any = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).pipe(filter((p: any) => p.code === undefined)).subscribe((position: Geoposition) => {

      console.log(position);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

      });

      this.db.userSetLoc(this.auth.uid, this.lat, this.lng);
    });

  }

  stopTracking() {
    console.log('stopTracking');
    this.zone.run(() => {
      this.lat = 0;
      this.lng = 0;
    });

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
    this.backgroundGeolocation.stop();
  }

}
