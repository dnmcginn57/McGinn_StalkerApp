import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { ResetpassPage } from '../resetpass/resetpass';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public auth: AuthProvider,
    private alertCtrl: AlertController,
    private storage: Storage
  ) { }


  ionViewWillLoad() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }


  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Email is not verified',
      subTitle: 'Please check your email',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  //Keona wanted to work on this
  //I made this seperately; won't be used
  /*async onForgotPassword() {
    try {
      let alert = this.alertCtrl.create({
        title: 'Please enter your email',
        inputs: [
          {
            name: 'name',
            placeholder: 'Email'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Reset password',
            handler: data => {
              this.auth.resetPassword(data.name).then(() =>{
                console.log("Password reset email sent");
              },error => {
                console.log(error);
                this.errorMessage = error;
              });
            }

          }
        ]
      });
      alert.present();
    } catch (e) {
      console.log(e);
    }
  }
  */

  async tryLogin(value) {
    try {
      await this.auth.loginWithEmail(value);

      let createStatus = await this.auth.wasJustCreated()
      if (await this.auth.isVerified() || !createStatus) {
        this.navCtrl.setRoot(TabsPage);
        this.storage.set('user', JSON.stringify(this.auth.uid));
      }
      else {

        this.presentAlert();
      }
    } catch (e) {
      console.log(e);
      this.errorMessage = e.message;
    }
  }

  async tryLoginWithGoogle() {
    try {
      await this.auth.loginWithGoogle();

      let createStatus = await this.auth.wasJustCreated()
      if (await this.auth.isVerified() || !createStatus) {
        this.navCtrl.setRoot(TabsPage);
        this.storage.set('user', JSON.stringify(this.auth.uid));
      }
      else {
        this.presentAlert();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async tryLoginWithTwitter() {
    try {
      await this.auth.loginWithTwitter();

      let createStatus = await this.auth.wasJustCreated()
      if (await this.auth.isVerified() || !createStatus) {
        this.navCtrl.setRoot(TabsPage);
        this.storage.set('user', JSON.stringify(this.auth.uid));
      }
      else {
        this.presentAlert();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async tryLoginWithFacebook() {
    try {
      await this.auth.loginWithFacebook();

      let createStatus = await this.auth.wasJustCreated()
      if (await this.auth.isVerified() || !createStatus) {
        this.navCtrl.setRoot(TabsPage);
        this.storage.set('user', JSON.stringify(this.auth.uid));
      }
      else {
        this.presentAlert();
      }
    } catch (e) {
      console.log(e);
    }
  }

  goToResetPassPage(){
    this.navCtrl.push(ResetpassPage);
    }
  
  goRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }


}
