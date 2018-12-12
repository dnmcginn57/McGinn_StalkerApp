import { Component } from '@angular/core';
import { NavController, ToastController, UrlSerializer } from 'ionic-angular';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular';


//import { HomePage } from '../home/home';



@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public auth: AuthProvider,
    private alertCtrl: AlertController,
  ) { }

  ionViewWillLoad() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required),
      first: new FormControl("", Validators.required),
      last: new FormControl("", Validators.required)
    },
      { validator: this.matchingPasswords('password', 'confirmPassword') });
  }

  //custom validator for matching passwords
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }



  //Attempts to register user
  //Params:
  //      value - a form with an email, password, first and last (names)
  async tryRegister(value) {
    try {
      await this.auth.postUser2Firebase(value.email, value.password, value.first, value.last);

      this.successMessage = "Your account has been created.";
      console.log(this.successMessage);

      let alert = this.alertCtrl.create({
        title: 'Account needs to be verified',
        subTitle: 'check your email',
        buttons: ['Dismiss']
      });
      alert.present();


      this.goLoginPage();

    }
    catch (e) {
      console.log(e);
      this.errorMessage = e.message;
      this.successMessage = "";
    }
  }

  /*
    registerTest(){
      this.auth.postUser2Firebase("me@website.com", "password1234", "Me", "Not you");
    }*/

  goLoginPage() {
    this.navCtrl.pop();
  }

}