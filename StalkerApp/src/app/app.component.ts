import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from '../providers/auth/auth';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private auth: AuthProvider,
    private storage: Storage) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.storage.get('user').then((user) => {
        if(user)
        {
          //If there is a user in storage set uid in auth
          //auth has not yet loaded so value would be null
          //TabsPage calls tracker which needs a valid uid
          auth.uid = JSON.parse(user);

          this.rootPage = TabsPage;
        }
        else{
          this.rootPage = LoginPage;
        }
      });
    });


  }

  ionViewDidLoad() {
    console.log("loading...");
    //if user is already logged in upon app launch, skip login page
    this.auth.getUser().then(res => {
      console.log(res);
      if (res != null) {
        this.rootPage = TabsPage;
        console.log("inside");
      }
      else {
        this.rootPage = LoginPage;
      }
      
    },
    
      error => console.log(error));
  }
}

