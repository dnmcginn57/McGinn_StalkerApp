
import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { ViewChild, ElementRef } from '@angular/core';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
import {FirebaseProvider} from '../../providers/firebase/old_firebase'

import { Geolocation } from '@ionic-native/geolocation';

declare var google;

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.

 * https://github.com/ramsatt/Ionic-3-Direction-Between-MyLocation-to-A-Particular-Place
 * https://www.joshmorony.com/implementing-turn-by-turn-navigation-with-google-maps-in-ionic/

 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  Destination: any = '';
  MyLocation: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation, public locationTracker: LocationTracker, private firebase: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

  calculateAndDisplayRoute() {
    let that = this;
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        that.MyLocation = new google.maps.LatLng(pos);

      }, function() {

      });
    } else {
      // Browser doesn't support Geolocation
    }

    directionsService.route({
    origin: this.MyLocation,
    destination: this.Destination,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

// posttodb(){
// this.geolocation.getCurrentPosition().then((resp) => {
//   var coord
//   {
//   lat1 : resp.coords.latitude
//   lon1:  resp.coords.longitude
//   }
//   this.firebase.postLocation(coord);
//  }).catch((error) => {
//    console.log('Error getting location', error);
//  });
 
//  let watch = this.geolocation.watchPosition();
//  watch.subscribe((data) => {
//   // data can be a set of coordinates, or an error (if an error occurred).
//   lat2: data.coords.latitude
//   lon2: data.coords.longitude
//  });

// }


start(){
  console.log("before");
  this.locationTracker.startTracking();
  //this.posttodb();


  // var coord = {
  //          lat: position.coords.latitude,
  //          lng: position.coords.longitude
  //        };

  // this.MyLocation = new google.maps.LatLng(coord);
  //      var myloc = this.MyLocation = new google.maps.LatLng(coord);
  //  this.firebase.postLocation(myloc);

 
  
  // const map = new google.maps.Map(document.getElementById('map'), {
  //   zoom: 7,
  //   center: {lat: 41.85, lng: -87.65}
  // });

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var coord = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };
  //     //map.setCenter(coord);
  //     this.MyLocation = new google.maps.LatLng(coord);
  //     var myloc = this.MyLocation = new google.maps.LatLng(coord);
  // this.firebase.postLocation(myloc);

  //   }, function() {

  //   });
  // } else {
  //   // Browser doesn't support Geolocation
  // }  

  
  console.log("after");
}

stop(){
  this.locationTracker.stopTracking();
}
}
