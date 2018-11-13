/*
*   $postUser2Firebase
*   $postUser
*   getUser
*   $putUser
*   $deleteUser
*
*   postGroup                                               POST     =>   Create new
*   getGroups
*   deleteGroup
*
*   postFriendRequest                                       GET      =>   Request exisiting data
*   postFriend
*   deleteFriendRequest
*   deleteFriend
*                                                           PUT      =>   Update
*   $postLocation              
*   getLocation

*   postImageTag                                            DELETE   =>   Remove data from collection
*   getImage
*   getImages
*   getImageTags
*   putImageTags
*   deleteImage
*
*   $loginWithEmail          
*   $loginWithGoogle       
*   $logout                
*/

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { GooglePlus } from '@ionic-native/google-plus';
//npm install firebase
import * as firebase from 'firebase/app';


@Injectable()
export class FirebaseProvider {

  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore,
    public googlePlus: GooglePlus) {

    //Subscribes to current user
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }


  //Creates a new firebase user with email and password
  postUser2Firebase(credentials) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    }).then(newUser => {
      console.log("UID: " + newUser.user.uid)
    })
  }

  //Creates user and adds to collection with an id
  //A user is composed of:
  //						first name
  //						last name
  //						email
  //						id
  postUser(username: any, first: any, last: any, email: any): Promise<void> {
    const id = this.afs.createId();
    console.log("account id: " + id);
    return this.afs.doc(`Users/${this.user.uid}`).set({
      id,
      username,
      first,
      last,
      email,
    });
  }

  //return document to current user
  async getUser(){
    let usersCollection = await this.afs.collection("Users");
    let adminDocument = await usersCollection.doc(this.user.uid);
    
    return adminDocument;
  }

  //Updates current user's field information
  putUser(credentials) {
    this.afs.doc(`Users/${this.user.uid}`).update(credentials)
      .catch(error => console.log(error));
  }

  //PROBLEM:
  //    USER IS DELETED BUT SUBCOLLECTION REMAINS?
  //Removes current user's document from firebase
  async deleteUser() {

    let qry = await this.afs.doc(`Users/${this.user.uid}`)
 
    qry.delete().then(() => {
      console.log("Document successfully deleted!");
      this.user.delete();
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }


  //Adds id, location and time to firebase
  postLocation(position) {
    console.log('Sending your coords');

    //let lat = position.coords.latitude;
    //let lon = position.coords.longitude;

    let stamp = Date.now();

    return new Promise<any>((resolve, reject) => {
      this.afs.collection(`Users`).doc(this.user.uid).collection('Locations').add({
        id: 1,
        point: 2, //new firebase.firestore.GeoPoint(lat, lon),
        time: new Date(stamp)
      })
        .then(
          (res) => {
            console.log("Location id: " + res.id)
            resolve(res)
          },
          err => reject(err)
        )
    });
  }

  //Returns current user's locations collection
  async getLocation() {
    let usersCollection = await this.afs.collection("Users");
    let adminDocument = await usersCollection.doc(this.user.uid);
    let adminsFollowersQuery = await adminDocument.collection("Locations");

    return adminsFollowersQuery;
  }


  //Signs existing user in with email and password
  loginWithEmail(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
      credentials.password);
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

  //Signs user out
  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

}
