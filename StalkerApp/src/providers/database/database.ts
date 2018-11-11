import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//Firebase Authentication
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class DatabaseProvider {

  constructor(
    //Angular fire authentication for use with firebase
    public afAuth: AngularFireAuth
  ) {
    console.log('Hello AuthServiceProvider Provider');
  }

  /**************************
   * Authentication Methods *
   **************************/

  /* EmailRegister
   * NOT YET IMPLEMENTED. COMMENT BLOCK IS FOR LATER REFERENCE. DOES THE SAME
   * THING AS "doEmailRegister" UNTIL FURTHER DEVELOPMENT.
   * Desc: Registers a user and adds information about them to the users
   *     collections on firestore.
   * Params:
   *     email: string, the email they're registering with
   *     password: string, password the user will log in with
   *     user: {}, user document that will be sent to database, keys include
   *         "nick": nickname for the user's profile,
   *         "first": First name of the user,
   *         "last": Last name of the user
   * Returns: None (throws error on failure)
   */
  // async EmailRegister(email, password) {
  //   try{
  //     await this.doEmailRegister(email, password);
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  /* Logout
   * Desc: Logs out of firebase account.
   *     (This is also done automatically upon closing the app)
   */
  async Logout(){
    try{
      await this.afAuth.auth.signOut();
    } catch(e) {
      //IDK why there would be an error but ya know
      throw e;
    }
  }

  /* doEmailRegister
   * Desc: Registers a user with the database on our firestore
   *     Basic register with no verification process.
   * Params:
   *     email: string, the email they're registering with
   *     password: string, password the user will log in with
   * Returns: None (throws error on failure)
   */
  async doEmailRegister(email, password) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      throw e;
    }
  }

  /* doEmailLogin
   * Desc: Attempts to login to account on firestore with given credentials
   *     Basic login with no returns or database entries.
   * Params:
   *     email: string, email associated with the account
   *     password: string, password to verify user's identity
   * Returns: None (throws error on failure)
   */
  async doEmailLogin(email, password) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    } catch (e) {
      throw e;
    }
  }

  /***********************
   * Database Operations *
   ***********************/

}
