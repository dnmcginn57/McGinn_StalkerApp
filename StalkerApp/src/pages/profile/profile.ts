import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';

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

  trackingState: string = "Start Tracking"


  userInfo:any = {
    email:null,
    name:null,
    photoUrl:null,
    emailVerified:null,
    uid:null
  };

  Request=[];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public camera: Camera,
    public database: DatabaseProvider,
    private alertCtrl: AlertController
  ) { 

    database.userGetPic(auth.uid).then((pic)=>{this.myPhoto = pic;});
    this.getCurrentUserInfo();
    database.userPendingFriends(auth.uid).then((request) => 
      { for(var key in request)
        {
          console.log(request[key]);
          this.Request.push(request[key]);
        }
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  async takePicture() {

    try {
      let imageData: string = await this.camera.getPicture(this.options);
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
      await this.database.storeImg(this.myPhoto, this.auth.uid + '_profile.jpg');
      await this.database.userSetPic(this.auth.uid, this.auth.uid + '_profile.jpg');
      this.myPhoto = await this.database.userGetPic(this.auth.uid);
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

  async getCurrentUserInfo()
  {
    try{
      let user = await this.auth.getUser();

      this.userInfo.name = user.displayName;
      this.userInfo.email = user.email;
      this.userInfo.photoUrl = user.photoURL;
      this.userInfo.emailVerified = user.emailVerified;
      this.userInfo.uid = user.uid;

    }
     catch(e)
     {
       console.log(e);
     }
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Edit name',
      inputs: [
        {
          name: 'name',
          placeholder: 'New Name'
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
          text: 'Save',
          handler: data =>{
            console.log(data.name);
            this.userInfo.name = data.name;
            this.auth.updateUser(this.userInfo.name);
            
          }

        }
      ]
    });
    alert.present();
  }

  Logout() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  toggleTracking()
  {
    if(this.trackingState == "Start Tracking") this.trackingState = "Stop Tracking";
    else this.trackingState = "Start Tracking";
  }

  async tagLoc(){
    try{
      await this.database.userAddTag(this.auth.uid, 100, 100);
    }catch(e){
      console.log(e);
    }
  }

}
