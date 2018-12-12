import { DatabaseProvider } from './../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';





/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.

 * https://github.com/ramsatt/Ionic-3-Direction-Between-MyLocation-to-A-Particular-Place
 * https://www.joshmorony.com/implementing-turn-by-turn-navigation-with-google-maps-in-ionic/

 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  public auth: AuthProvider;
  picName: string = 'something';
  tempName: string;
  myPhoto: any;
  public database: DatabaseProvider;
  position: any;
  latlng: any;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.CAMERA,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: false,
    encodingType: this.camera.EncodingType.JPEG,
    saveToPhotoAlbum: false
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public geolocation: Geolocation, private alertCtrl: AlertController,public camera:Camera) {}

  async takePicture() {
    try {
      //takes the picture and saves it to a string v
      let imageData: string = await this.camera.getPicture();
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
      // Prompts the user to name the picture v
      await this.presentPrompt();
      // gets the current location of user
      await navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
      // adds the picture, name and location to the database v
      await this.database.userAddTag(this.auth.uid, this.picName,
       this.position.coords.latitude , this.position.coords.longitude,this.myPhoto);
    } catch (e) {
      console.log(e);
    }
  }

  


// Prompts the user to enter the name of the picture
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Save Picture As',
      inputs: [
        {
          name: 'name',
          placeholder: 'Untitled'
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
          text: 'OK',
          handler: data => {
            this.picName = data.name;
            //console.log(this.picName)
          }
        }
      ]
    });
    alert.present();
  }

    ionViewDidLoad() {
      console.log('ionViewDidLoad LocationPage');
    }
  }
