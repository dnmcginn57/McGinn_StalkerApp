import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular';


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
    private alertCtrl: AlertController
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

  async tryLogin(value) {
    try {
      await this.auth.loginWithEmail(value);

      if (await this.auth.isVerified()) {
        this.navCtrl.setRoot(TabsPage);
      }
      else{
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
      
      if (await this.auth.isVerified()) {
        this.navCtrl.setRoot(TabsPage);
      }
      else{
        this.presentAlert();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async tryLoginWithTwitter() {
    try {
      await this.auth.loginWithTwitter();
      
      if (await this.auth.isVerified()) {
        this.navCtrl.setRoot(TabsPage);
      }
      else{
        this.presentAlert();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async tryLoginWithFacebook() {
    try {
      await this.auth.loginWithFacebook();
      
      if (await this.auth.isVerified()) {
        this.navCtrl.setRoot(TabsPage);
      }
      else{
        this.presentAlert();
      }
    } catch (e) {
      console.log(e);
    }
  }

  goRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

}
