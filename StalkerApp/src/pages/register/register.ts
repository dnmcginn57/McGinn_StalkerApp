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

  //connected to the register button
  //right now it just boots back to the Login Page
  tryRegister(value){
    this.auth.postUser2Firebase(value.email, value.password, value.first, value.last)
    .then(res=>{
      this.successMessage="Your account has been created.";
      this.goLoginPage();
    },
    err=>{
      console.log(err.message);
       this.errorMessage = err.message;
       this.successMessage = "";
    })
    
  }

  registerTest(){
    this.auth.postUser2Firebase("me@website.com", "password1234", "Me", "Not you");
  }

  goLoginPage(){
    this.navCtrl.pop();
  }

}