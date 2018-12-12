import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { User, Chat } from "./app.models";
import { FIREBASE_CONFIG } from "./credentials";
import { async } from "rxjs/internal/scheduler/async";

import { DatabaseProvider } from '../providers/database/database';
@Injectable()
export class ChatService {
  users: AngularFirestoreCollection<User>;
  chats: AngularFirestoreCollection<Chat>;

  //The pair string for the two users currently chatting
  currentChatPairId;
  currentChatPartner;
  currentUser;
  
  constructor(private db: AngularFirestore) {
    this.users = db.collection<User>( FIREBASE_CONFIG.users_endpoint);
    this.chats = db.collection<Chat>( FIREBASE_CONFIG.chats_endpoint);
  }
  addUser(payload) {
    return this.users.add(payload);
  } //addUser

  addChat(chat: Chat) {
    return this.chats.add(chat);
  } //addChat

  createPairId(user1, user2) {
    let pairId;
//console.log("Pairing ID:" + user2.email);
    if (user1.time < user2.time) {
      
      pairId =`${user1.time}|${user2.time}`

      console.log ("Pair ID is: " + pairId);
    } else {
      pairId = `${user2.time}|${user1.time}`;
      console.log ("Pair ID is: "+pairId);
    }

    return pairId;
  } //createPairString

}
