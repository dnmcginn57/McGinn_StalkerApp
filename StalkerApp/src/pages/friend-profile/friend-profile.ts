import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FriendProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend-profile',
  templateUrl: 'friend-profile.html',
})
export class FriendProfilePage {

  activeFriend;
  testImage = "../../assets/imgs/frens.png";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.activeFriend = navParams.data;
    console.log(this.activeFriend);
    console.log(this.activeFriend.user.first);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendProfilePage');
  }

  goBack()
  {
    this.navCtrl.pop();
  }


}
