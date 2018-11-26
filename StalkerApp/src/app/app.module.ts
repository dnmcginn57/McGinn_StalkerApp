import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { TabsPageModule  } from '../pages/tabs/tabs.module';
import { MapPageModule  } from '../pages/map/map.module';
import { ProfilePageModule  } from '../pages/profile/profile.module';
import { FriendPageModule } from '../pages/friend/friend.module';
import { LocationPageModule  } from '../pages/location/location.module';
import { LoginPageModule  } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';

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

@NgModule({
  declarations: [
    MyApp,
    //TabsPage,
    //MapPage,
    //ProfilePage,
    //FriendPage,
    //LocationPage,
    //LoginPage,
    //RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FriendPageModule,
    LocationPageModule,
    LoginPageModule,
    RegisterPageModule,
    TabsPageModule,
    MapPageModule,
    ProfilePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    /*TabsPage,
    MapPage,
    ProfilePage,
    //FriendPage,
    LocationPage,
    LoginPage,
    RegisterPage*/
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    TwitterConnect,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    GooglePlus,
    AuthProvider
  ]
})
export class AppModule {}
