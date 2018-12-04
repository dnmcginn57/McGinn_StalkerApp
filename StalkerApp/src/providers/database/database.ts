import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class DatabaseProvider {

  //The user directory
  users: any[];
  //Download URLs for specific image files in storage. Keyed like so
  //{
  //  './myfile.jpg': 'https://www.whatever.thisdownload.net/myfile.jpg',
  //  './otherfile.jpg': 'https://www.whatever.thisdownload.net/otherfile.jpg'
  //}
  image_urls: any = {};

  private fire: any;

  constructor(
    public db: AngularFirestore,
    public store: AngularFireStorage
  ) {

    this.fire = firebase.firestore()

    //Track any changes to the Users collection
    this.db.collection('Users').valueChanges().subscribe((collection) => {

      //Store collection in the users object
      this.users = collection;
      //For each user in the users collection
      this.users.forEach((user) => {

        //If the user has a picture
        if (user.Picture != null) {
          //Get the download url of the file listed as its picture
          this.store.storage.ref(user.Picture).getDownloadURL().then((url) => {
            //Store that url in an object, keyed with the name of the file
            this.image_urls[user.Picture] = url;
          });
        }

      })

    });

  }

  /**********************************************
  *  Functions for general database management  *
  **********************************************/

  /* storeImg
   * Desc: Asynchronous. Stores an image to the firebase storage.
   * Params:
   *     image64: a base 64 encoded image (uri?)
   *     filename: the name the user wishes to give the file
   * returns: nothing.
   */
  async storeImg(image64: string, filename: string) {
    try {
      let image_folder = this.store.ref('images/' + filename);

      image_folder.putString(image64, 'data_url');

    } catch (e) {
      throw e;
    }
  }

  async usersObject() {

    try {
      var query = await this.fire.collection("Users").get();
      var collection_obj = {};
      query.forEach(
        (doc: any) => {
          var doc_obj = {};
          var doc_data = doc.data();
          for (var field in doc_data) {
            doc_obj[field] = doc_data[field];
          }
          collection_obj[doc.id] = doc_obj;
        }
      );

      return collection_obj;

    }
    catch (e) {
      throw e;
    }
  }


  /**********************************************
  *        Functions for a specific user        *
  **********************************************/

  async userAcceptFriendRequest(id: string, other: string){
    try{
      let temp = {};
      temp["dismissed"] = true;
      await this.db.collection("Users").doc(id).collection("FriendRequests").doc(other).set(temp);
      await this.userAddFriend(id, other);
      await this.userAddFriend(other, id);
    }catch(e){
      throw e;
    }
  }

  async userAddFriend(id: string, other: string){
    try{
      let temp = {};
      temp["reference"] = this.db.collection("Users").doc(other).ref;
      await this.db.collection("Users").doc(id).collection("Friends").doc(other).set(temp);
    }catch(e){
      throw e;
    }
  }

  async userAddTag(id: string, lat: number, lon: number) {
    try {
      let temp = {};
      temp["Time"] = new Date();
      temp["Location"] = [lat, lon];
      await this.db.collection("Users").doc(id).collection("Tags").add(temp);
    } catch (e) {
      throw e;
    }
  }

  async userDeclineFriendRequest(id: string, other: string){
    try{
      let temp = {};
      temp["dismissed"] = true;
      await this.db.collection("Users").doc(id).collection("FriendRequests").doc(other).set(temp);
    }catch(e){
      throw e;
    }
  }

  async userGetPic(id: string) {
    let allUsers = await this.usersObject();
    return this.image_urls[allUsers[id]['Picture']];
  }

  async userFriendsObject(id: string){
    try {
      var query = await this.fire.collection("Users").doc(id).collection("Friends").get();
      var collection_obj = {};
      query.forEach(
        (doc: any) => {
          var doc_obj = {};
          var doc_data = doc.data();
          for (var field in doc_data) {
            doc_obj[field] = doc_data[field];
          }
          collection_obj[doc.id] = doc_obj;
        }
      );

      var all = await this.usersObject();
      var friends_obj = {}
      for(let keyID in collection_obj){
        friends_obj[keyID] = all[keyID];
      }

      return friends_obj;
    }
    catch (e) {
      throw e;
    }

  }

  async userNameString(id: string){
    try{
      var user = await this.usersObject();
      user = user[id];
      return user["first"] + " " + user["last"];
    }catch(e){
      throw e;
    }
  }

  //Returns the ids of all users that sent a request
  async userPendingFriendIDs(id: string){
    
    try {

      var query = await this.fire.collection("Users").doc(id).collection("FriendRequests").get();
      var collection_obj = {};
      query.forEach(
        (doc: any) => {
          var doc_obj = {};
          var doc_data = doc.data();
          for (var field in doc_data) {
            doc_obj[field] = doc_data[field];
          }
          collection_obj[doc.id] = doc_obj;
        }
      );

      var list = [];
      for(let keyID in collection_obj){
        if (!collection_obj[keyID]["dismissed"]){
          list.push(keyID);
        }
      }

      console.log(list);
      return list;
    }
    catch (e) {
      throw e;
    }

  }

  //Returns the ids of all users that sent a request
  async userPendingFriends(id: string){
    
    try {

      var users_query = await this.fire.collection("Users").get();
      var users_obj = {};
      users_query.forEach(
        (doc: any) => {
          var doc_obj = {};
          var doc_data = doc.data();
          for (var field in doc_data) {
            doc_obj[field] = doc_data[field];
          }
          users_obj[doc.id] = doc_obj;
        }
      );

      var requests_query = await this.fire.collection("Users").doc(id).collection("FriendRequests").get();
      var requests_obj = {};
      requests_query.forEach(
        (doc: any) => {
          var doc_obj = {};
          var doc_data = doc.data();
          for (var field in doc_data) {
            doc_obj[field] = doc_data[field];
          }
          requests_obj[doc.id] = doc_obj;
        }
      );

      var list = {};
      for(let keyID in requests_obj){
        if (!requests_obj[keyID]["dismissed"]){
          list[keyID] = users_obj[keyID];
        }
      }

      console.log(list);
      return list;
    }
    catch (e) {
      throw e;
    }

  }

  async userSendFriendRequest(id: string, other: string){   
    try{
      let temp = {};
      temp["dismissed"] = false;
      await this.db.collection("Users").doc(other).collection("FriendRequests").doc(id).set(temp);
    }catch(e){
      throw e;
    }
  }

  async userSetLoc(id: string, lat: number, lon: number) {
    try {
      let temp = {};
      temp["LastLocation"] = [lat, lon];
      await this.db.collection("Users").doc(id).update(temp);
    } catch (e) {
      throw e;
    }
  }

  async userSetPic(id: string, filename: string) {
    try {
      let temp = {};
      temp["Picture"] = 'images/' + filename;
      await this.db.collection("Users").doc(id).update(temp);
    } catch (e) {
      throw e;
    }
  }

  /* userSetDoc
   * Desc: Asynchronous. Uploads a user document to the firestore.
   * Params:
   *     id: the id of the document being set
   *     firstname: the first name of the user
   *     lastname: the last name of the user
   * returns: nothing.
   */
  async userSetDoc(id: string, firstname: string, lastname: string) {
    try {

      var obj = {
        first: firstname,
        last: lastname
      }

      await this.db.collection('Users').doc(id).set(obj);

    } catch (e) {
      throw e;
    }
  }

}
