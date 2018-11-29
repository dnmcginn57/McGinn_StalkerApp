
import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { ViewChild, ElementRef } from '@angular/core';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
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


  constructor(public navCtrl: NavController, public navParams: NavParams, public locationTracker: LocationTracker) {
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


start(){
  console.log("before");
  this.locationTracker.startTracking();
  console.log("after");
}

stop(){
  this.locationTracker.stopTracking();
}
}
