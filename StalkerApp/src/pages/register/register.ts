import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';


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
    public auth: AuthProvider
  ) {}

  ionViewWillLoad(){
    this.registerForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
      first: new FormControl(),
      last: new FormControl()
    });
  }

  //Attempts to register user
  //Params:
  //      value - a form with an email, password, first and last (names)
  async tryRegister(value){
    try{
      await this.auth.postUser2Firebase(value.email, value.password, value.first, value.last);

      this.successMessage="Your account has been created.";
      console.log(this.successMessage);

      this.goLoginPage();
    }
    catch(e){
      console.log(e);
       this.errorMessage = e;
       this.successMessage = "";
    } 
  }

/*
  registerTest(){
    this.auth.postUser2Firebase("me@website.com", "password1234", "Me", "Not you");
  }*/

  goLoginPage(){
    this.navCtrl.pop();
  }

}