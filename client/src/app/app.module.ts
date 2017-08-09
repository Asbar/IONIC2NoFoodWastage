import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ConnectivityService } from '../providers/connectivity-service';

import { MyApp } from './app.component';
import { hungerSpotsPage } from '../pages/hungerSpots/hungerSpots';
import { ContactUsPage } from '../pages/ContactUs/ContactUs';
import { viewRatedCharityHomePage } from '../pages/viewRatedCharityHome/viewRatedCharityHome';
import { findNearestCharityHomePage } from '../pages/findNearestCharityHome/findNearestCharityHome';
import { myProfilePage } from '../pages/MyProfile/MyProfile';
import { loginPage } from '../pages/login/login';
import { donateFoodPage } from '../pages/donateFood/donateFood';
import { signUpPage } from '../pages/signUp/signUp';
import { chatBoxpage } from '../pages/chatBox/chatBox';
import { logOutPage } from '../pages/logout/logout';
import { newFeedpage } from '../pages/newFeed/newFeed.component';
import { newsFeedService } from '../Services/newFeed.services';
import { addHungerSpotService } from '../Services/addHungerSpot.Service';

import { AngularFireModule } from 'angularfire2';
import { Ionic2RatingModule } from 'ionic2-rating';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AgmCoreModule } from "angular2-google-maps/core";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { HaversineService } from "ng2-haversine";
import { HttpModule} from '@angular/http';
//import { ReactiveFormsModule } from "@angular/forms/src/form_providers";

export const firebaseConfig = {
  apiKey: "AIzaSyA_5-tlWTpppVplyyxpMTWhv65oXFFhrAA",
  authDomain: "nofoodwastage-1491541564025.firebaseapp.com",
  databaseURL: "https://nofoodwastage-1491541564025.firebaseio.com",
  projectId: "nofoodwastage-1491541564025",
  storageBucket: "nofoodwastage-1491541564025.appspot.com",
  messagingSenderId: "628396998654"
};

@NgModule({
  declarations: [
    MyApp,
    hungerSpotsPage,
    ContactUsPage,
    viewRatedCharityHomePage,
    findNearestCharityHomePage,
    myProfilePage,
    loginPage,
    donateFoodPage,
    signUpPage,
    chatBoxpage,
    logOutPage,
    newFeedpage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    Ionic2RatingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    // ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC0aD4jIug1iTLe4eIY4EtgPp10KGd0HNk",
      libraries: ["places"]
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    hungerSpotsPage,
    ContactUsPage,
    viewRatedCharityHomePage,
    findNearestCharityHomePage,
    myProfilePage,
    loginPage,
    signUpPage,
    donateFoodPage,
    chatBoxpage,
    logOutPage,
    newFeedpage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    HaversineService,
    Camera,
    ConnectivityService,
    newsFeedService,
    addHungerSpotService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})

export class AppModule { }
