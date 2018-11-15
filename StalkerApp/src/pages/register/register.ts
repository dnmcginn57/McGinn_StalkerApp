import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


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
    public toastCtrl: ToastController
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
    this.goLoginPage();
  }


  goLoginPage(){
    this.navCtrl.pop();
  }

}