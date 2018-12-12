
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {DatabaseProvider} from '../../providers/database/database';
import {AuthProvider} from '../../providers/auth/auth';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})



export class MapPage {


  @ViewChild('map') mapElement: ElementRef;
  Destination: any;
  MyLocation: any;
  map: any;
  stylesArray = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];
  
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation,
    public database:DatabaseProvider, public auth:AuthProvider) {
  }

  ionViewDidLoad() {
    this.loadMap();
    console.log('ionViewDidLoad MapPage');
  }

  
 


  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng =  new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

       
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: this.stylesArray 

      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.database.userSetLoc(this.auth.uid,position.coords.latitude,position.coords.longitude);
    }, (err) => {
      console.log(err);
    });
 
  }


  addfriendstomap(){

       

    var Markerlocations = [
      [33.8689,98.5329],
      [33.8669,98.5364],
      [33.8669,98.5390],
      [33.8669,98.5400],
      [33.8669,98.5333],
      [33.8669,98.5382],
    ];
        
    //var marker;
   // for (var i = 0; i < Markerlocations.length; i++) {

    //   var latitud = Markerlocations[i];
    //   var longitud = Markerlocations[i];
    //   var latLng = new google.maps.LatLng(latitud, longitud);
    //   marker = new google.maps.Marker({
    //     //map: $scope.map,
    //     position: latLng
    //   });
    // }

    var j;
    
    for (j=0; j< Markerlocations.length; j++)
    {
      var friendmarker = new google.maps.Marker({
        //map: this.map,
        position: new google.maps.LatLng(Markerlocations[j][0],Markerlocations[j][1]),
        animation: google.maps.Animation.Bounce,
      })
    }

  }


  async addMarker(){
 
    
    let user = await(this.database.usersObject());
    let me=user[this.auth.uid];
    console.log(me.first);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(parseFloat(me.LastLocation[0]),parseFloat(me.LastLocation[1]))
    });
    // this.addfriendstomap();
    let first=me.first;
    let last=me.last;
    let content = first+" "+last;         
   
    this.addInfoWindow(marker, content);

      let friend =await this.database.userFriendsObject(this.auth.uid);
      for(var key in friend)
      {
         console.log(friend[key].LastLocation);
          if(friend[key].LastLocation!=undefined||friend[key].LastLocation!=null)
          {
            await this.addMarker2(friend[key].LastLocation[0],
            friend[key].LastLocation[1],friend[key].first+" "+friend[key].last);
              
          }
        }
      
  }
  async addMarker2(lat:number, long:number,info:string){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lat,long)
    });

    let content = info;         
   
    this.addInfoWindow(marker, content);
       
  }


   




  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  calculateAndDisplayRoute() {
    let that = this;
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65},
      styles: this.stylesArray
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
}
