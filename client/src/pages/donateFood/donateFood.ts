import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { findNearestCharityHomePage } from '../findNearestCharityHome/findNearestCharityHome';
import { Camera } from '@ionic-native/camera';
import 'whatwg-fetch';

@Component({
  selector: 'donate-food',
  templateUrl: 'donateFood.html'
})
export class donateFoodPage {

  private tempDonateLists: FirebaseListObservable<any>;
  address: String;
  food: String;
  foodQty: number;
  date: String;
  time: String;
  public base64Image: string;

  constructor(public navCtrl: NavController, private af: AngularFire, private alertCtrl: AlertController, private camera: Camera) {
    this.tempDonateLists = af.database.list('/donationLists');
  }

  submitDonations() {
    if (this.address == undefined) {
      this.presentAlert("Error", "Address field is Empty", "Ok")
      return;
    } else if (this.food == undefined) {
      this.presentAlert("Error", "Food field is Empty", "Ok")
      return;

    } else if (this.foodQty == undefined) {
      this.presentAlert("Error", "Food Quantity field is Empty", "Ok")
      return;

    } else if (this.date == undefined) {
      this.presentAlert("Error", "Date field is Empty", "Ok")
      return;

    } else if (this.time == undefined) {
      this.presentAlert("Error", "Time field is Empty", "Ok")
      return;

    } else if(this.base64Image == undefined){
      this.presentAlert("Error", "Food image is not selected", "Ok")
      return;
    } 
    else {
       let data = {
        Address: this.address,
        food: this.food,
        foodQty: this.foodQty,
        date: this.date,
        time: this.time,
        foodImage: this.base64Image
    }
      this.tempDonateLists.push({
        Address: this.address,
        food: this.food,
        foodQty: this.foodQty,
        date: this.date,
        time: this.time,
        foodImage: this.base64Image
      });
      this.presentAlert("Success Message", "Now, Select the nearest location to send the message", "Ok")
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      this.navCtrl.push(findNearestCharityHomePage,data);
    }
  }
  presentAlert(Title, SubTitle, button) {
    let alert = this.alertCtrl.create({
      title: Title,
      subTitle: SubTitle,
      buttons: [button]
    });
    alert.present();
  }

  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      //alert(this.base64Image);

    }, (err) => {
      console.log(err);
    });
  }
}
