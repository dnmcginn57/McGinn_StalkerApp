import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {AuthProvider} from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  myPhoto:any='../../assets/imgs/logo.png';
  options: CameraOptions = {
    quality: 75,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.CAMERA,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    encodingType: this.camera.EncodingType.JPEG,
    targetWidth: 300,
    targetHeight: 300,
    saveToPhotoAlbum: false
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public auth: AuthProvider, public camera:Camera) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  takePicture(){
   
    this.camera.getPicture(this.options).then((imageData) => {
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err)
    });
  }

  Logout(){
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
