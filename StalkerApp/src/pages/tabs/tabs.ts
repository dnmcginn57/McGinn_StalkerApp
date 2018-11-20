import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MapPage } from '../map/map';
import { ProfilePage } from '../profile/profile';
import { FriendPage } from '../friend/friend';
import { LocationPage } from '../location/location';
import {LoginPage} from '../login/login';

//Tabs page; you shouldn't have to do much here
//unless you want more tabs

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage { 


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
  
  //tab roots set to their proper pages
  tab1Root = MapPage;
  tab2Root = ProfilePage;
  tab3Root = FriendPage;
  tab4Root = LocationPage;

}
