import { MyApp } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';

import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { LocationPage } from './../pages/location/location';
import { FriendPage } from './../pages/friend/friend';
import { ProfilePage } from './../pages/profile/profile';
import { MapPage } from './../pages/map/map';
import { TabsPage } from './../pages/tabs/tabs';

//Firebase team imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FIREBASE_CONFIG } from './credentials';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Facebook } from '@ionic-native/facebook';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MapPage,
    ProfilePage,
    FriendPage,
    LocationPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MapPage,
    ProfilePage,
    FriendPage,
    LocationPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Facebook,
    TwitterConnect,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    GooglePlus,
    AuthProvider
  ]
})
export class AppModule {}
