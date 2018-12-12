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

  picName: string = 'something';
  tempName: string;
  myPhoto: any;
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    private alertCtrl: AlertController,
    public camera: Camera,
    public database: DatabaseProvider,
    public auth: AuthProvider
  ) { }

  async takePicture() {
    try {

      var theDate = new Date().toString();
      var filename = this.auth.uid + '_' + theDate + ".jpg";

      let imageData: string = await this.camera.getPicture(this.options);
      var image64 = 'data:image/jpeg;base64,' + imageData;
      await this.database.storeImg(image64, filename);

      //Get the name of the tag
      //await this.presentPrompt();

      // gets the current location of user
      console.log("getting location");
      var pos = await this.geolocation.getCurrentPosition();
      console.log("got location: ", pos);
      this.position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      await this.database.userAddTag(this.auth.uid, this.picName,
        this.position.lat, this.position.lng, filename);

    } catch (e) {
      console.log(e);
    }
  }




  // Prompts the user to enter the name of the picture
  async presentPrompt() {
    try{
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
      await alert.present();
    }catch(e){
      console.log(e);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }
}
