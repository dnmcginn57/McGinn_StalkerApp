import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth,public googlePlus: GooglePlus) {
    console.log('Hello AuthProvider Provider');
  }

  //Signs existing user in with email and password
  //Param:
  //    credentials = {
  //        email:String,
  //        password:String
  //      };
  async loginWithEmail(credentials) {
    try{
      await this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
        credentials.password);
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Signs user in with google account
  loginInWithGoogle(): Promise<any> {
    return new Promise((resolve, reject) => {
      if ((<any>window).cordova) {
        this.googlePlus.login({
          'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
          'webClientId': '264506855386-ieokeaf7hvim6dtr4nhnn0892be145mc.apps.googleusercontent.com',// optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          'offline': true
        }).then((response) => {
          const googleCredential = firebase.auth.GoogleAuthProvider.credential(response.idToken);
          firebase.auth().signInWithCredential(googleCredential)
            .then((user) => {
              resolve();
            });
        }, (err) => {
          reject(err);
        });
      }
      else {
        this.afAuth.auth
          .signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then((user) => {
            resolve()
          })
      }
    })
  }

    //Logs user out
    async logout(){
      try{
        await this.afAuth.auth.signOut();
      }
      catch(e)
      {
        console.log(e);
      }
    }

}
