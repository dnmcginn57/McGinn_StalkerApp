import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the AllUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-users',
  templateUrl: 'all-users.html',
})
export class AllUsersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db:DatabaseProvider, public auth:AuthProvider) {
  }

  //use this function to populate the list with all users
  //each time the page loads
  ionViewDidLoad() {
    console.log('ionViewDidLoad AllUsersPage');
  }

  //this function is complete. it just takes you
  //right back to the friend page
  goBack()
  {
    this.navCtrl.pop();
  }

  //this method is called when a user's list item is clicked
  // it should send them a friend request
  sendFriendRequest()
  {
    console.log('this will eventually send a friend request')
  }

}
