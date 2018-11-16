
import { Injectable } from '@angular/core';
//Firebase Authentication
import { AngularFirestore } from 'angularfire2/firestore';
import { _iterableDiffersFactory } from '@angular/core/src/application_module';

@Injectable()
export class DatabaseProvider {

  _db: AngularFirestore
  constructor(
    _db: AngularFirestore
  ) {
    console.log('Hello AuthServiceProvider Provider');
    this._db = _db;
  }

  /* setUserDoc
   * Desc: Asynchronous. Uploads a user document to the firestore.
   * Params:
   *     id: the id of the document being set
   *     firstname: the first name of the user
   *     lastname: the last name of the user
   * returns: nothing.
   */
  async setUserDoc(id: string, firstname: string, lastname: string){
    try{

      var obj = {
        first: firstname,
        last: lastname
      }
      await this._db.collection('Users').doc(id).set(obj);

    }catch(e){

      throw e;
    
    }
  }

}
