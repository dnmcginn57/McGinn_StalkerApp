import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';


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
    public auth: AuthProvider
  ) {}

  ionViewWillLoad(){
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  
  tryLogin(value){
    this.auth.loginWithEmail(value).then(res=>{
      this.navCtrl.push(TabsPage);
    }, 
    err =>{
      this.errorMessage="The email or password is incorrect. Please try again.";
    })
    
  }

 

  goRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }

}