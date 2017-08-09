import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { myProfilePage } from '../MyProfile/MyProfile';
import { chatBoxpage } from '../chatBox/chatBox';
import { loginPage } from '../login/login';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


import 'rxjs/add/operator/map'

@Component({
  selector: 'viewRated',
  templateUrl: 'viewRatedCharityHome.html',
})
export class viewRatedCharityHomePage {

  mySelectedProfileDetails: any;
  searchTerm: string = '';
  anything: any;
  myProfileDetails:any;
  foodQty;

  private ratedCharityPlaces: FirebaseListObservable<any>;
  private myDbProfile: FirebaseListObservable<any>;
  
  constructor(public navCtrl: NavController, public modCtrl: ModalController, private af: AngularFire) {
    if (!window.localStorage.getItem('currentuser')) {
      let myModal = this.modCtrl.create(loginPage);
      myModal.present();
    } else {
      console.log("Your are logged in")
    }

    this.ratedCharityPlaces = af.database.list('/CharityPlaces');
    this.myDbProfile = af.database.list('/UsingProfiles');

    //this.ratedCharityPlaces.push({City:'Eheliyagoda',Name:'Sacheen Warnaka',Rate:1.5,URL:"https://scontent.fcmb3-1.fna.fbcdn.net/v/t1.0-9/15940804_418084778523680_268910852360763719_n.jpg?oh=ecaed060ec80aa25c30a63407e1095d6&oe=5976768E"});
  }

  moveto(itemName, starRate, url) {
    let data = {
      profile: true,
      startPoint: starRate,
      Name: itemName,
      profImage: url
    }
    this.navCtrl.push(myProfilePage, data);
  }

  ionViewDidLoad() {
    this.setFilteredItems();
    this.setFilteredProfileDetails();
  }

taste:any;
 setFilteredProfileDetails() {
    this.mySelectedProfileDetails= this.myProfileDetails = this.myDbProfile.map(_jobs => _jobs.filter((item) => {
      var currentEmail = localStorage.getItem("currentuser");
      if(item.email==currentEmail){
        window.localStorage.setItem('currentUserProf', item.profImg);
        window.localStorage.setItem('rateLevel', item.rateLevel);
        window.localStorage.setItem('ratedUsers', item.ratedUsers);
        window.localStorage.setItem('location', item.location);
        window.localStorage.setItem('isCharityMan', item.isCharityMan);
        window.localStorage.setItem('currentUserId', item.$key);
        
        return item.email;
      }
    }));
  }
  setFilteredItems() {
    if (this.searchTerm == '') {
      this.anything = this.myDbProfile;
    } else {
      this.anything = this.myDbProfile.map(_jobs => _jobs.filter((item) => {
        if (item.email != null && item.email.length > 0 && this.searchTerm != null && this.searchTerm.length > 0)
          return item.email.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      }));

    }
  }
  chatPage(itemName, starRate, url) {
    let data = {
      startPoint: starRate,
      Name: itemName,
      profImage: url
    }
    this.navCtrl.push(chatBoxpage,data);
  }
}
