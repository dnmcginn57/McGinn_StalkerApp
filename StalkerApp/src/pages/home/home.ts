//This is a testing page
//Functions are called upon button clicks
//These functions show the firebase-service can be called

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { AuthProvider} from '../../providers/auth/auth'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  //Inject firebaseProvider
  constructor(private auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams, private fb: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

  }

  //Creates a user and puts them into database
  signup() {
    let cred = {
      username: "JakobL",
      first: "Jakob",
      last: "Lopez",
      email: "thejakoblopez@gmaii.com",
      password: "MobileApps2!"
    }

    //tries to authenticate user to firebase
    //if succesful, user is added to collection
    this.auth.postUser2Firebase(cred.email,cred.password).then(() => {
      this.fb.postUser(cred.username, cred.first, cred.last, cred.email)
    }, err => console.log(err));
  }

  //Logs user in with email
  login() {
    let log = {
      email: "thejakoblopez@gmaii.com",
      password: "MobileApps2!"
    }
    //console log tells whether login was success or not
    this.fb.loginWithEmail(log).then(data => {
      console.log("Login was a success")
    }, error => console.log(error));
  }




  //Updates current user fields
  //Leaves non-updated fields the same
  update() {
    let c = {
      username: "beep",
      first: "boop"
    }

    this.fb.putUser(c);
  }

  //Gets document to current user
  //To get specific field, change param in get()
  async getUser() {
    let userDoc = await this.fb.getUser();

    userDoc.get().subscribe((user) => {
      if (user.exists)
        console.log(user.get("email"));
      else
        console.log("No such document!");
    });
  }


  //Removes user from database
  delete() {
    try {
      this.fb.deleteUser();
    }
    catch (e) {
      console.log(e)
    }
  }

  //logs user out
  logout(){
    this.fb.logout().then(() => {
      console.log("logout was successfull")
    });
  }

  //Send location to database
  uploadlocation() {
    this.fb.postLocation(2);
  }

  //Gets location collection that belonds to user
  //To get specific field, change param in get()
  async getLocation() {
    let locDoc = await this.fb.getLocation();

    locDoc.get().subscribe((adminsFollowers) => {
      adminsFollowers.docs.forEach((adminFollower) => {
        console.log(adminFollower.get("time"));
      });
    });

  }
    //attempts to log user in wiht google account
    google()
    {
      this.auth.loginInWithGoogle().then(() => {
        console.log("signed in with google")
      });
    }
}
