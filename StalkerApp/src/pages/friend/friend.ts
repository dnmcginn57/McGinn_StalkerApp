import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllUsersPage } from '../all-users/all-users';
import { FriendProfilePage } from '../friend-profile/friend-profile';
import { PersonalchatPage } from '../personalchat/personalchat';
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
  testImage = "assets/imgs/frens.png";
  Friends=[];
 // theirPhoto:any='../../assets/imgs/logo.png';

  constructor(public navCtrl: NavController, public navParams: NavParams, public db:DatabaseProvider,
    public auth:AuthProvider) {
      
  }
  ionViewWillLoad()
  {
    this.getFriends();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendPage');
  }

  async getFriends()
  {
    let friend =await this.db.userFriendsObject(this.auth.uid);
      var theirPhoto:string;
       for(var key in friend)
      {
         theirPhoto=await (this.picture(key));
         this.Friends.push({key:key,user:friend[key],Picture:theirPhoto});
        }
    
  }
  async picture(key): Promise<string>
  {
    var temp= await this.db.userGetPic(key);
      return temp;
  }

  goAllUsers()
  {
    this.navCtrl.push(AllUsersPage);
  }


  goFriendProfile(friend)
  {
    console.log(friend);
    this.navCtrl.push(FriendProfilePage,friend)

  }
  goPersonalChat(friend){
    console.log(friend);
    this.navCtrl.push(PersonalchatPage,friend)


  }

}
