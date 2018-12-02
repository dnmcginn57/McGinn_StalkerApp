
import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { ViewChild, ElementRef } from '@angular/core';



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



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }



}
