import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
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
  myPhoto: any;
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
  prof_pic: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public camera: Camera,
    public database: DatabaseProvider
  ) { 
    database.profilePic(auth.uid).then((pic)=>{this.prof_pic = pic;});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  async takePicture() {

    try {
      let imageData: string = await this.camera.getPicture(this.options);
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
      await this.database.storeImg(this.myPhoto, this.auth.uid + '_profile.jpg');
      await this.database.setUserImg(this.auth.uid, this.auth.uid + '_profile.jpg');
      this.prof_pic = await this.database.profilePic(this.auth.uid);
    } catch (e) {
      console.log(e);
    }

    /*!!!PLEASE USE ASYNC/AWAIT TO HELP PREVENT APP CRASHES!!!
    this.camera.getPicture(this.options).then((imageData) => {
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err)
    });
    */

  }

  Logout() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
