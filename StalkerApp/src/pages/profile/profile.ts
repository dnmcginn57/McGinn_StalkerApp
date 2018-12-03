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
  myPhoto: any = '../../assets/imgs/logo.png';
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


  userInfo: any = {
    email: null,
    full_name: null,
    first_name: null,
    last_name: null,
    photoUrl: null,
    emailVerified: null,
    uid: null
  };


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public camera: Camera,
    public database: DatabaseProvider,
    private alertCtrl: AlertController
  ) {

    database.userGetPic(auth.uid).then((pic) => { this.myPhoto = pic; });
    this.getCurrentUserInfo();

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

  //Gets currently logged in user's information
  async getCurrentUserInfo() {
    try {
      let user = await this.auth.getUser();

      this.userInfo.full_name = user.displayName;
      this.userInfo.email = user.email;
      this.userInfo.photoUrl = user.photoURL;
      this.userInfo.emailVerified = user.emailVerified;
      this.userInfo.uid = user.uid;

      //If user was authenticated with email and password
      if (this.userInfo.full_name == null) {
        let fullname = await this.database.userNameString(this.userInfo.uid);

        //Splits full name into first and last
        let names = fullname.split(" ");
        this.userInfo.first_name = names[0];
        this.userInfo.last_name = names[1];
      }
      else {
        //Splits full name into first and last
        let names = this.userInfo.full_name.split(" ");
        this.userInfo.first_name = names[0];
        this.userInfo.last_name = names[1];
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  //Presents a prompt to user
  //Allows user to edit and save their first name
  presentPromptFirstName() {
    let alert = this.alertCtrl.create({
      title: 'Edit name',
      inputs: [
        {
          name: 'name',
          placeholder: this.userInfo.first_name
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
          handler: data => {
            this.userInfo.first_name = data.name;
            this.auth.updateUser(this.userInfo.first_name + " " + this.userInfo.last_name);
            //should also change in database

          }

        }
      ]
    });
    alert.present();
  }

  //Presents a prompt to user
  //Allows user to edit and save their last name
  presentPromptLastName() {
    let alert = this.alertCtrl.create({
      title: 'Edit name',
      inputs: [
        {
          name: 'name',
          placeholder: this.userInfo.last_name
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
          handler: data => {
            this.userInfo.last_name = data.name;
            this.auth.updateUser(this.userInfo.first_name + " " + this.userInfo.last_name);

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

  toggleTracking() {
    if (this.trackingState == "Start Tracking") this.trackingState = "Stop Tracking";
    else this.trackingState = "Start Tracking";
  }

  async tagLoc() {
    try {
      await this.database.userAddTag(this.auth.uid, 100, 100);
    } catch (e) {
      console.log(e);
    }
  }

}
