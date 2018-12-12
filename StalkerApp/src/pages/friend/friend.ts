import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllUsersPage } from '../all-users/all-users';
import { FriendProfilePage } from '../friend-profile/friend-profile';
import { PersonalchatPage } from '../personalchat/personalchat';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
import { ChatService } from "../../app/app.service";
import { FIREBASE_CONFIG } from '../../app/credentials';
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from 'firebase/app';
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
  testImage = "../../assets/imgs/frens.png";
  Friends=[];
  chatuser:any;
 // theirPhoto:any='../../assets/imgs/logo.png';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public db:DatabaseProvider,
              public auth:AuthProvider,
              private data: AngularFirestore,
              private chatService: ChatService) {
      this.getFriends();
    
  }
  ionViewWillLoad()
  {
   
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
    //console.log(friend);
    this.navCtrl.push(FriendProfilePage,friend)

  }
  async goPersonalChat(friend){
 
    // Tries to pair user to friend to start chat
    try {
    
      // Gets users from the database   
    let users =  await this.db.usersObject();
      
      // Sets the friend selected as the users current chat partner
      this.chatService.currentChatPartner = friend.user;
      
      // Gets the current user
      this.chatuser = users[this.auth.uid];
      
      //Sets the current user
      this.chatService.currentUser= this.chatuser;
      console.log( this.chatuser.first+ " is signed in");
      // Calls the chatService to pair the chat participants
      this.chatService.currentChatPairId = this.chatService.createPairId(
      this.chatuser,
      friend.user);
      
      //Opens the chat
      this.navCtrl.push(PersonalchatPage);
    }
    // Catches error if getting the users fail
    catch (e) 
    {
      console.log(e);
    }
  }
 
}
