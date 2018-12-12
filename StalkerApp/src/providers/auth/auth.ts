import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase/app';
import { DatabaseProvider } from '../database/database';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { Typography } from 'ionic-angular';





@Injectable()
export class AuthProvider {

  userProfile: any = null;

  //id where user is stored in Firebase
  uid: string;

  constructor(public afAuth: AngularFireAuth,
    public googlePlus: GooglePlus,
    public database: DatabaseProvider,
    public twitterConnect: TwitterConnect,
    public facebook: Facebook,
    public storage: Storage) {
    console.log('Hello AuthProvider Provider');

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user.email + " is signed in")
      } else {
        console.log("Nobody is signed in")
      }
    });
  }

  //********************************************************************//
  //                        Login User
  // 
  // Signs user in with their account. If user is signing in with
  // Google,Facebook or Twitter and it is their 1st time logging into the 
  // app, account gets created for them in Firebase auth and the database
  //********************************************************************//
  async loginWithEmail(credentials) {
    try {
      this.userProfile = await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
      this.uid = this.afAuth.auth.currentUser.uid;
    }
    catch (e) {
      throw (e);
    }
  }

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

        //displayName is in format "first last"
        //.split() allows to seperate first from last
        let names = userProfile.displayName.split(" ");

        //If this is user's 1st time logging in, adds them to database
        await this.trySetUserDoc(this.uid, names[0], names[1]);

      }
      else {
        await this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
        this.uid = this.afAuth.auth.currentUser.uid;

        //displayName is in format "first last"
        //.split() allows to seperate first from last
        let name = this.afAuth.auth.currentUser.displayName;
        let names = name.split(" ");

        //If this is user's 1st time logging in, adds them to database
        await this.trySetUserDoc(this.uid, names[0], names[1]);
      }
    } catch (e) {
      throw (e);
    }
  }

  async loginWithFacebook() {
    try {
      if ((<any>window).cordova) {
        // Login with permissions
        let res: FacebookLoginResponse = await this.facebook.login(['public_profile', 'user_photos',
          'email', 'user_birthday']);

        const facebookCredential = await firebase.auth.FacebookAuthProvider
          .credential(res.authResponse.accessToken);

        // Log user into firebase
        let success = await firebase.auth().signInWithCredential(facebookCredential)

        console.log("Firebase success: " + JSON.stringify(success));

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

          //If this is user's 1st time logging in, adds them to database
          let names = name.split(" ");
          await this.trySetUserDoc(this.uid, names[0], names[1]);
        }
      }
      else {
        await this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
        this.uid = this.afAuth.auth.currentUser.uid;

        //displayName is in format "first last"
        //.split() allows to seperate first from last
        let name = this.afAuth.auth.currentUser.displayName;
        let names = name.split(" ");

        //If this is user's 1st time logging in, adds them to database
        await this.trySetUserDoc(this.uid, names[0], names[1]);
      }
    } catch (e) {
      throw (e);
    }
  }


  //********************************************************************//
  //       Linking current user to another form of authentication
  // 
  // If user is on mobile device, they will be redirected to another 
  // window to link they're current account with their preferred media.
  // If on a browser, user links account through a popup window.
  //********************************************************************//

  async linkWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();

      if ((<any>window).cordova) {
        await this.afAuth.auth.currentUser.linkWithRedirect(provider);

        let result = await firebase.auth().getRedirectResult();
      } else {
        await this.afAuth.auth.currentUser.linkWithPopup(provider);
      }
      console.log("Link with Google successful")
    } catch (e) {
      throw (e);
    }
  }

  async linkWithTwitter() {
    try {
      const provider = new firebase.auth.TwitterAuthProvider();
      if ((<any>window).cordova) {
        await this.afAuth.auth.currentUser.linkWithRedirect(provider);

        let result = await firebase.auth().getRedirectResult();
      } else {
        await this.afAuth.auth.currentUser.linkWithPopup(provider);
      }
      console.log("Link with Twitter successful")
    } catch (e) {
      throw (e);
    }
  }

  async linkWithFacebook() {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      if ((<any>window).cordova) {
        await this.afAuth.auth.currentUser.linkWithRedirect(provider);

        let result = await firebase.auth().getRedirectResult();
      } else {
        await this.afAuth.auth.currentUser.linkWithPopup(provider);
      }
      console.log("Link with Facebook successful")
    } catch (e) {
      throw (e);
    }
  }



  //********************************************************************//
  //                        Miscellaneous
  // 
  // trySetUserDoc - 
  //     If account was just created, add account to database.
  //     This function is called in the Google, Facebook and Twitter
  //     logins because social media accounts only get added to Firebase
  //     authentication, so they need to manually get added upon creation.
  // 
  // postUser2Firebase - 
  //     Creates a new Firebase user with email and password. This will
  //     only be called when registering an account, so it calls 
  //     trySetUserDoc(). The Firebase user does not initially have a 
  //     displayName, so an update function is called to set it.      
  //
  // updateUser - 
  //     Updates current user's displayName in Firebase auth        
  //
  // getUser - 
  //     Returns currently signed in user
  //
  // logout - 
  //     Logs the current user out of their account       
  //********************************************************************//

  async trySetUserDoc(uid, firstname, lastname) {
    try {
      let metadata = await firebase.auth().currentUser.metadata;
      if(metadata.creationTime == metadata.lastSignInTime) {
        // The user is new
        //Add the user to the collection
        console.log("This user was just created...adding to database");

        await this.verifyUserEmail();

        await this.database.userSetDoc(uid, firstname, lastname);
      }
    } catch (e) {
      throw (e);
    }
  }

  async wasJustCreated()
  {
    try {
      let metadata = await firebase.auth().currentUser.metadata;
      if(metadata.creationTime == metadata.lastSignInTime) {
        return true;
        
      }
      else{
        return false;
      }
    } catch (e) {
      throw (e);
    }
  }

  async verifyUserEmail() {
    try {
      let user = firebase.auth().currentUser;;
      await user.sendEmailVerification();

      console.log("Email verification message sent")
    }
    catch (e) {
      throw (e);
    }
  }

  async isVerified() {
    try{
      let flag = await this.afAuth.auth.currentUser.emailVerified;

      return flag;
    }
    catch(e)
    {
      throw(e);
    }

  }


  async postUser2Firebase(email, password, firstname, lastname) {
    try {
      let newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await this.trySetUserDoc(newUser.user.uid, firstname, lastname);

      await this.updateUser(firstname + " " + lastname);
      console.log(`${newUser.user.email} 's UID: ${newUser.user.uid}`);
    }
    catch (e) {
      throw (e);
    }
  }


  async updateUser(name) {
    try {
      let user = firebase.auth().currentUser;

      await user.updateProfile({
        displayName: name,
        photoURL: ""
      });
    } catch (e) {
      throw (e);
    }
    //make a call to database to update user's name
  }

  async getStorage()
  {
    try{
      return await this.storage.get('user');
    }catch(e)
    {
      throw(e);
    }
  }

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

      //NEEDS CORDOVA LOGOUT WONT WORK IN BROWSER
      /*let data = await this.facebook.getLoginStatus();
      if (data.status = 'connected') {
        this.facebook.logout();
      }*/

      await this.storage.remove('user');
    }
    catch (e) {
      throw(e);
    }
  }
}
