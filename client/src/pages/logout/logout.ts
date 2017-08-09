import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';  
import { loginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'logout.html',
})
export class logOutPage {

  constructor(public navCtrl: NavController,public alertController:AlertController) {
    window.localStorage.removeItem('currentuser');
    this.navCtrl.push(loginPage);
  }
}
