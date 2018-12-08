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
   * Desc: ASYNC. Stores an image to the firebase storage.
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

  /* usersObject
   * Desc: ASYNC. Get an object containing all users in the database.
   * Returns: an object containing all users in the database, keyed by user id
   * Example returned object:
   *     {
   *         "SGUSBONAOINUE": {
   *             "first": "John",
   *             "last": "Doe",
   *             "Picture": "./John_Doe.jpg"
   *         },
   *         "XCASIUGDAUIGT": {
   *             "first": "Jane",
   *             "last": "Doe",
   *             "Picture": "./Jane_Doe.jpg"
   *         }
   *     }
   */
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

  /* userAcceptFriendRequest
   * Desc: ASYNC. Accept a friend request from one user to another based on id.
   *     Also adds the users to each others' friends list.
   * Params:
   *     id: the id of the user accepting the request
   *     other: the id of the user that sent the request
   * Returns: None
   */
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

  /* userAddFriend
   * Desc: ASYNC. Adds a user to another user's friends list using ids
   * Params:
   *     id: the id of the user whose friend list is being appended to
   *     other: the id of the user whose being added to the friends list
   * Returns: None
   */
  async userAddFriend(id: string, other: string){
    try{
      let temp = {};
      temp["reference"] = this.db.collection("Users").doc(other).ref;
      await this.db.collection("Users").doc(id).collection("Friends").doc(other).set(temp);
    }catch(e){
      throw e;
    }
  }

  /* userAddTag
   * Desc: ASYNC. Adds a location to a user's tagged locations.
   * Params:
   *     id: the id of the user who is adding the location
   *     lat: the latitude of the location
   *     lon: the longitude of the location
   * Returns: None
   */
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

  /* userByID
   * Desc: ASYNC. Gets an object with a user's information using their id.
   * Params:
   *     id: the id of the user whose object is being retrieved
   * Returns: Object containing user's data from the database
   * Example returned object:
   *     {
   *         "first": "John",
   *         "last": "Doe",
   *         "Picture": "./John_Doe.jpg"
   *     }
   */
  async userByID(id: string){
    try{
      var all_users = await this.usersObject();
      if(all_users[id]){
        return all_users[id];
      }else{
        throw "Error in DatabaseProvider function userByID(): No user with id " + id;
      }
    }catch(e){
      throw e;
    }
  }

  /* userDeclineFriendRequest
   * Desc: ASYNC. Decline a friend request from one user to another based on
   *     id. Flags the friend request as "dismissed" without adding them to a
   *     friends' list.
   * Params:
   *     id: the id of the user declining the friend request
   *     other: the id of the user whose request is being declined
   * Returns: None
   */
  async userDeclineFriendRequest(id: string, other: string){
    try{
      let temp = {};
      temp["dismissed"] = true;
      await this.db.collection("Users").doc(id).collection("FriendRequests").doc(other).set(temp);
    }catch(e){
      throw e;
    }
  }

  /* userGetPic
   * Desc: ASYNC. Gets the download urlk of a user's profile pic using their id
   * Params:
   *     id: the id of the user whose picture download url is being retrieved
   * Returns: (string)Download URL of the user's profile picture.
   */
  async userGetPic(id: string) {
    let allUsers = await this.usersObject();
    return this.image_urls[allUsers[id]['Picture']];
  }

  /* userFriendsObject
   * Desc: ASYNC. Get all the user's friends as an object.
   * Params:
   *     id: the id of the user whose friends' are being retrieved
   * Returns: an object containing the info of all the user's friends, keyed
   *     by the friends' ids
   * Example returned object:
   *     {
   *         "SGUSBONAOINUE": {
   *             "first": "John",
   *             "last": "Doe",
   *             "Picture": "./John_Doe.jpg"
   *         },
   *         "XCASIUGDAUIGT": {
   *             "first": "Jane",
   *             "last": "Doe",
   *             "Picture": "./Jane_Doe.jpg"
   *         }
   *     }
   */
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

  /* userNameString
   * Desc: ASYNC. Gets the user's first and last name as a single string
   *     (usually for display).
   * Params:
   *     id: id of the user
   * Returns: (string) full name of the user
   * Example returned string: "John Doe"
   */
  async userNameString(id: string){
    try{
      var user = await this.usersObject();
      user = user[id];
      return user["first"] + " " + user["last"];
    }catch(e){
      throw e;
    }
  }

  /* userPendingFriendIDS
   * Desc: ASYNC. Gets the id of all users with a pending friend request to
   *     the given user.
   * Params:
   *     id: the id of the user whose pending friends are being retrieved
   * Returns: (string[]) list of pending request user ids
   * Example returned list:
   *     ["SGUSBONAOINUE", "XCASIUGDAUIGT"]
   */
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

  /* userPendingFriendIDS
   * Desc: ASYNC. Gets an object containing the info for all users with a
   *     pending friend request to the given user. Keyed by id.
   * Params:
   *     id: the id of the user whose pending friends are being retrieved
   * Returns: an object containing the info of all the user's pending friends,
   *     keyed by the pending friends' ids
   * Example returned object:
   *     {
   *         "SGUSBONAOINUE": {
   *             "first": "John",
   *             "last": "Doe",
   *             "Picture": "./John_Doe.jpg"
   *         },
   *         "XCASIUGDAUIGT": {
   *             "first": "Jane",
   *             "last": "Doe",
   *             "Picture": "./Jane_Doe.jpg"
   *         }
   *     }
   */
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

  /* userSendFriendRequest
   * Desc: ASYNC. Sends a friend request from one user to another based on ids.
   * Params:
   *     id: the id of the user sending the friend request
   *     other: the id of the user receiving the friend request
   * Returns: None
   */
  async userSendFriendRequest(id: string, other: string){   
    try{
      let temp = {};
      temp["dismissed"] = false;
      await this.db.collection("Users").doc(other).collection("FriendRequests").doc(id).set(temp);
    }catch(e){
      throw e;
    }
  }

  /* userSetLoc
   * Desc: ASYNC. Sets the current location of the user
   * Params:
   *     id: id of the user whose location is being set
   *     lat: latitude of the user's location
   *     lon: longitude of the user's location
   * Returns: None
   */
  async userSetLoc(id: string, lat: number, lon: number) {
    try {
      let temp = {};
      temp["LastLocation"] = [lat, lon];
      //Edited this line from update to set
      await this.db.collection("Users").doc(id).set(temp);
    } catch (e) {
      throw e;
    }
  }

  /* userSetName
   * Desc: Sets the name of a user in the database using the user's id
   * Params:
   *     id: id of the user whose name is being set
   *     first: first name of the user
   *     last: last name of the user
   * Returns: None
   */
  async userSetName(id: string, first: string, last: string){
    try {
      let temp = {};
      temp["first"] = first;
      temp["last"] = last;
      await this.db.collection("Users").doc(id).update(temp);
    } catch (e) {
      throw e;
    }
  }

  /* userSetPic
   * Desc: ASYNC. Sets the filename of the user's profile picture. The file
   *     MUST be located in 'images/' inside of the firebase storage.
   * Params:
   *     id: the id of the user whose image is being set
   *     filename: the name of the file containing their profile picture
   */
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
