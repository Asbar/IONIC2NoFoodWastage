import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { hungerSpotsPage } from '../pages/hungerSpots/hungerSpots';

import { ContactUsPage } from '../pages/ContactUs/ContactUs';
import { viewRatedCharityHomePage } from '../pages/viewRatedCharityHome/viewRatedCharityHome';
import { findNearestCharityHomePage } from '../pages/findNearestCharityHome/findNearestCharityHome';
import { myProfilePage } from '../pages/MyProfile/MyProfile';
import { donateFoodPage } from '../pages/donateFood/donateFood';
import { newFeedpage } from '../pages/newFeed/newFeed.component';
import { logOutPage } from '../pages/logout/logout';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = viewRatedCharityHomePage;
  currentUser: String;
  UserName: any;
  profUrl: String;
  pages: Array<{ title: string, component: any, icon: string }>;
  Morepages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.profUrl = window.localStorage.getItem('currentUserProf');
    this.currentUser = localStorage.getItem("currentuser");
    this.UserName = localStorage.getItem("UserName");

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Rated Charity Places', component: viewRatedCharityHomePage, icon: "star" },
      { title: 'Add Hunger Spot', component: hungerSpotsPage, icon: "md-add-circle" },
      { title: 'Nearest CharityHomes/HSpots', component: findNearestCharityHomePage, icon: "md-locate" },
      { title: 'Donate Food', component: donateFoodPage, icon: "md-train" },
    ];

    this.Morepages = [
      { title: 'Contact Us', component: ContactUsPage, icon: "md-contacts" },
      { title: 'My Profile', component: myProfilePage, icon: "ios-contact" },
      { title: 'News Feeds', component: newFeedpage, icon: "ios-list-box-outline" },
      { title: 'LogOut', component: logOutPage, icon: "md-power" },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
