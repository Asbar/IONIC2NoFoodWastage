import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
//import { numberValidation } from './numberValidator';
import { Geolocation } from '@ionic-native/geolocation';
import { addHungerSpotService } from '../../Services/addHungerSpot.Service';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'hungerSpots.html',
  styles: [`#map{
      height:50%;
      width:100%;
  }`],
})
export class hungerSpotsPage {

  AllCharityLists: FirebaseListObservable<any>;
  location: any;
  mobile: any;
  address: String;
  numPeople: number;
  latlang: any;
  currentLat:any;
  currentLong:any;
  locationName:any;

  @ViewChild('map') mapElement;
  map: any;
  constructor(public navCtrl: NavController,private addhungSer:addHungerSpotService, af: AngularFire, private alertCtrl: AlertController, private geolocation: Geolocation) {
    this.AllCharityLists = af.database.list('/hungerSpots');

  }


  addCharity() {
    if(this.currentLat==undefined || this.currentLong==undefined){
      this.presentAlert("Error", "Error occure in location selection.Please select again", "Ok");
      return;
    }else if (this.locationName == undefined) {
      this.presentAlert("Error", "location field is Empty", "Ok");
      return;
    } else if (this.mobile == undefined) {
      this.presentAlert("Error", "Please enter the Mobile Number", "Ok");
      return;
    } else if (this.address == undefined) {
      this.presentAlert("Error", "Address field is Empty", "Ok");
      return;
    } else if (this.numPeople == undefined) {
      this.presentAlert("Error", "Enter the Number of people", "Ok");
      return;
    }
    this.latlang = { lat: 45, long: 45 };
    this.AllCharityLists.push({ location: this.location, mobile: this.mobile, addresss: this.address, numPeople: this.numPeople, latlang: this.latlang });



    this.addhungSer.AddHungerSpots(this.location,this.mobile,this.address,this.numPeople,this.latlang);
    this.presentAlert("Success Message", "Successfully Saved", "Ok");
  }

  ionViewDidLoad() {
    this.initMap();
  }
  tempLocation;

  mapClick() {

    //let myPosition = this.map.getCurrentPosition();
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.center
    });

    google.maps.event.addListener(marker, "click", function (event) {
      var latitude = event.latLng.lat();
      var longitude = event.latLng.lng();
      //console.log(latitude + ', ' + longitude);
      this.tempLocation = latitude + ', ' + longitude;
      window.localStorage.setItem("tempLoc",this.tempLocation);
      window.localStorage.setItem("latTemp", latitude);
      window.localStorage.setItem("longTemp", longitude);

    });
  }

  setCurrentLoc() {
    console.log(window.localStorage.getItem("tempLoc"));
    if (window.localStorage.getItem("tempLoc") != undefined) {
      var lat = window.localStorage.getItem("latTemp");
      var long = window.localStorage.getItem("longTemp");
    }
    if (lat != undefined && long != undefined) {
      this.location = lat + ', ' + long;
      this.currentLat = lat;
      this.currentLong = long;

    }
  }


  initMap() {
    let latLng = new google.maps.LatLng(-34.00, 138.6010);
    let mapOptions = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4><Button>View Profile</Button>";

    this.addInfoWindow(marker, content);

  }
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  presentAlert(Title, SubTitle, button) {
    let alert = this.alertCtrl.create({
      title: Title,
      subTitle: SubTitle,
      buttons: [button]
    });
    alert.present();
  }

}
