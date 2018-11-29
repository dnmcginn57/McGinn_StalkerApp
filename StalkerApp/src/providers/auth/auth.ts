import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase/app';
import { DatabaseProvider } from '../database/database';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';



@Injectable()
export class AuthProvider {

  userProfile: any = null;

  //id where user is stored in Firebase
  uid: string;

  constructor(public afAuth: AngularFireAuth,
    public googlePlus: GooglePlus,
    public database: DatabaseProvider,
    public twitterConnect: TwitterConnect,
    public facebook: Facebook) {
    console.log('Hello AuthProvider Provider');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user.email + " is signed in")
      } else {
        console.log("Nobody is signed in")
      }
    });
  }

  async trySetUserDoc(uid, firstname, lastname) {
    try {
      let metadata = await firebase.auth().currentUser.metadata;
      if (metadata.creationTime == metadata.lastSignInTime) {
        // The user is new
        //Add the user to the collection
        console.log("This user was just created...adding to database");
        await this.database.setUserDoc(uid, firstname, lastname);
      }
    } catch (e) {
      throw (e);
    }
  }

  //Creates a new Firebase user with email and password
  async postUser2Firebase(email, password, firstname, lastname) {
    try {

      let newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);

      await this.trySetUserDoc(newUser.user.uid, firstname, lastname);

      console.log(`${newUser.user.email} 's UID: ${newUser.user.uid}`);
    }
    catch (e) {
      throw (e);
    }
  }

  //Signs existing user in with email and password
  //Param:
  //    credentials = {
  //        email:String,
  //        password:String
  //      };
  async loginWithEmail(credentials) {
    try {
      this.userProfile = await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
      this.uid = this.afAuth.auth.currentUser.uid;
    }
    catch (e) {
      throw (e);
    }
  }

  //Signs user in with google account
  //User does not need to sign up for Stalker App
  //If user doesn't exist when signing in with Google,
  //function automatically creates account in Firebase
  async loginWithGoogle() {
    try {
      if ((<any>window).cordova) {
        let response = await this.googlePlus.login({
          'webClientId': '733520227387-jmb6ooftoiu5g4j9pg57lbeo89006fru.apps.googleusercontent.com',// optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          'offline': true
        })

        //Waits to get Google account's credentials, so user can get logged in
        const googleCredential = await firebase.auth.GoogleAuthProvider.credential(response.idToken);
        let profile = await firebase.auth().signInWithCredential(googleCredential);
        this.userProfile = profile;

        this.uid = this.afAuth.auth.currentUser.uid;

        //displayName is in format "first last"
        //.split() allows to seperate first from last
        let names = profile.displayName.split(" ");

        //If this is user's 1st time logging in, adds them to database
        await this.trySetUserDoc(this.uid, names[0], names[1]);

      }
      else {
        //If on web browser, use popup window
        await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

        this.uid = this.afAuth.auth.currentUser.uid;

        //displayName is in format "first last"
        //.split() allows to seperate first from last
        let name = this.afAuth.auth.currentUser.displayName;
        let names = name.split(" ");


        //If this is user's 1st time logging in, adds them to database
        await this.trySetUserDoc(this.uid, names[0], names[1]);
      }
    }
    catch (e) {
      throw (e);
    }
  }

  //Signs user in with Twitter account
  //User does not need to sign up for Stalker App.
  //If user doesn't exist when signing in with Twitter,
  //function automatically authenticates account in Firebase
  async loginWithTwitter() {
    try {
      if ((<any>window).cordova) {
        let response = await this.twitterConnect.login();
        console.log("loginWithTwitter successful", response)

        const twitterCredential = await firebase.auth.TwitterAuthProvider
          .credential(response.token, response.secret);

        let userProfile = await firebase.auth().signInWithCredential(twitterCredential)
        this.userProfile = userProfile;
        this.userProfile.twName = response.userName;
        console.log(this.userProfile);

        this.uid = this.afAuth.auth.currentUser.uid;

        return this.userProfile;
      }
      else {
        await this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
        this.uid = this.afAuth.auth.currentUser.uid;
      }
    } catch (e) {
      throw (e);
    }
  }

  //Signs user in with Facebook account
  //User does not need to sign up for Stalker App.
  //If user doesn't exist when signing in with Facebook,
  //function automatically authenticates account in Firebase
  async loginWithFacebook() {
    try {
      if ((<any>window).cordova) {
        // Login with permissions
        let res: FacebookLoginResponse = await this.facebook.login(['public_profile', 'user_photos',
          'email', 'user_birthday']);

        // The connection was successful
        if (res.status == "connected") {

          // Get user ID and Token
          //let fb_id = await res.authResponse.userID;
          //let fb_token = await res.authResponse.accessToken;

          // Get user infos from the API
          let user = await this.facebook.api("/me?fields=name,gender,birthday,email", []);
          this.userProfile = user;

          // Get the connected user details
          let gender = user.gender;
          let birthday = user.birthday;
          let name = user.name;
          let email = user.email;

          console.log("=== USER INFOS ===");
          console.log("Gender : " + gender);
          console.log("Birthday : " + birthday);
          console.log("Name : " + name);
          console.log("Email : " + email);

          this.uid = this.afAuth.auth.currentUser.uid;

        }
      }
      else {
        await this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
        this.uid = this.afAuth.auth.currentUser.uid;

      }

    } catch (e) {
      throw (e);
    }
  }

  //Returns currently signed in user
  async getUser() {
    try {
      let user = await this.afAuth.auth.currentUser;

      if (user != null) {
        user.providerData.forEach(function (profile) {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
      }
      return user;
    }
    catch (e) {
      throw (e);
    }

  }

  //Logs user out
  async logout() {
    try {
      await this.afAuth.auth.signOut();
    }
    catch (e) {
      console.log(e);
    }
  }

}
