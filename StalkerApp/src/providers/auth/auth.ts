import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase/app';
import { DatabaseProvider } from '../database/database';


@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth, public googlePlus: GooglePlus, public database: DatabaseProvider) {
    console.log('Hello AuthProvider Provider');
  }

  //Creates a new Firebase user with email and password
  async postUser2Firebase(email, password, firstname, lastname) {
    try {
      let newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
      //Add the user to the collection
      this.database.setUserDoc(newUser.user.uid, firstname, lastname);
      console.log(`${newUser.user.email} 's UID: ${newUser.user.uid}`);
    }
    catch (e) {
      console.log(e);
    }
  }

  //Signs existing user in with email and password
  //Param:
  //    credentials = {
  //        email:String,
  //        password:String
  //      };
  loginWithEmail(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			credentials.password);
  }

  //Signs user in with google account
  //User does not need to sign up for Stalker App
  //If user doesn't exist when signing in with Google,
  //function automatically creates account in Firebase
  async loginInWithGoogle() {
    try {
      if ((<any>window).cordova) {
        let response = await this.googlePlus.login({
          'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
          'webClientId': '733520227387-jmb6ooftoiu5g4j9pg57lbeo89006fru.apps.googleusercontent.com',// optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          'offline': true
        })
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(response.idToken);
        firebase.auth().signInWithCredential(googleCredential);
      }
      else {
        await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      }
    }
    catch (e) {
      console.log(e);
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
