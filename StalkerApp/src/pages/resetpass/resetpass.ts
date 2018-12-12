import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';

import {DatabaseProvider} from '../../providers/database/database';
import {AuthProvider} from '../../providers/auth/auth';

/**
 * Generated class for the ResetpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpass',
  templateUrl: 'resetpass.html',
})
export class ResetpassPage {

  ResetForm: FormGroup;
  email: string;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public userservice: DatabaseProvider,
    public alertCtrl: AlertController,
    public auth: AuthProvider) {
  }

    ionViewWillLoad() {
      this.ResetForm = this.formBuilder.group({
        email: new FormControl(),
        newpassword: new FormControl(),
        confirmpassword: new FormControl(),
      });
      //{validator: this.matchingPasswords('password', 'confirmPassword')});
    }

    async trychangepass()
    {
      this.successMessage="Your pasword has been changed.";
      console.log(this.successMessage);
    }

    reset()
    {
      let alert = this.alertCtrl.create({
        buttons:['Ok']
      });
      this.userservice.passwordreset(this.email).then((res:any)=>{
        if(res.success){
        alert.setTitle('Email Sent');
        alert.setSubTitle('Please follow the instructions in the email to reset your password');
        }
        else{
          alert.setTitle('Failed');
        }
      })
    }

    goLoginPage(){
      this.navCtrl.pop();
    }
}
