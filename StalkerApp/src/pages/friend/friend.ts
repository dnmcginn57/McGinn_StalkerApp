import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllUsersPage } from '../all-users/all-users';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the FriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend',
  templateUrl: 'friend.html',
})
export class FriendPage {
  Friends=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db:DatabaseProvider,
    public auth:AuthProvider) {
      
      db.userFriendsObject(auth.uid).then((friend) => 
      { for(var key in friend)
        {
          console.log(friend[key]);
          this.Friends.push(friend[key]);
        }
      });
      console.log(this.Friends);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendPage');
  }

  goAllUsers()
  {
    this.navCtrl.push(AllUsersPage);
  }

}
