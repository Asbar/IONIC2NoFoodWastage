import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Camera } from '@ionic-native/camera';
import { chatBoxpage } from '../chatBox/chatBox';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map'
declare var google: any;


@Component({
  selector: 'MyProfile',
  templateUrl: 'MyProfile.html',
  styles: [`#map{
      width: 100%;
        height: 25%;
  }`]
})
export class myProfilePage {

  starPoint;
  public base64Image: string;
  task: FirebaseListObservable<any>;
  isEnableCharity: boolean = false;
  profName: String;
  notMyProfile: boolean = false;
  private profImage;
  private myDbProfile: FirebaseListObservable<any>;
  tempUrl = "https://scontent.fcmb3-1.fna.fbcdn.net/v/t1.0-9...";
  UserName = localStorage.getItem("UserName");
  anything: any;
  myProfile: String;
  currentUserProf: String;
  isMap: true;
  ratedUsers;
  location = "Get Location";
  currentLat;
  currentLong;
  address;
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, private geolocation: Geolocation, af: AngularFire, public alertController: AlertController, private camera: Camera, public navParam: NavParams) {
    this.myDbProfile = af.database.list('/UsingProfiles');
  }

  ionViewDidLoad() {
    this.loadMap();
    this.setFilteredItems();
    this.notMyProfile = this.navParam.get('profile');
    this.profName = this.navParam.get('Name');
    this.starPoint = this.navParam.get('startPoint');
    this.profImage = this.navParam.get('profImage');

    if (this.notMyProfile == false || this.notMyProfile == undefined) {
      this.profName = this.UserName;
      this.ratedUsers = window.localStorage.getItem('ratedUsers');
      this.starPoint = window.localStorage.getItem('rateLevel');
      this.currentUserProf = window.localStorage.getItem('currentUserProf');
    } else {
      this.base64Image = this.profImage;
    }
  }

  loadMap() {

    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  setFilteredItems() {
    this.anything = this.myDbProfile.map(_jobs => _jobs.filter((item) => {
      return item.location;
    }));
  }

  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      alert(this.base64Image);

    }, (err) => {
      console.log(err);
    });
  }

  chatPage(itemName, starRate, url) {
    let data = {
      startPoint: starRate,
      Name: itemName,
      profImage: url
    }
    this.navCtrl.push(chatBoxpage, data);
  }

  addLocation() {

    if(this.location==undefined || this.location=="Get Location"){
      this.presentAlert("Error Message", "Please Select the location before enable charity", "Ok");
      this.isEnableCharity = false;      
      return;
    }

    if (this.isEnableCharity) {
      let newUserModel = this.alertController.create({
        title: "Your Location",
        message: "Your location cordinate is "+this.location,
        inputs: [
          {
            name: "addresss",
            placeholder: "Location Name"
          }
        ],
        buttons: [
          {
            text: "OK",
            handler: data => {
                 this.address = data.addresss 
            }
          },
          {
            text: "Cancel",
            handler: data => {
              this.isEnableCharity = false;
            }
          }
        ]
      });
      newUserModel.present(newUserModel)
    }
  }
    presentAlert(Title, SubTitle, button) {
    let alert = this.alertController.create({
      title: Title,
      subTitle: SubTitle,
      buttons: [button]
    });
    alert.present();
  }

  SaveAll(){

    if(this.address =="" || this.address ==undefined){
      this.presentAlert("Error Message", "Please select the location to enble charity Home", "Ok");
      return;
    }

    this.myDbProfile.update(window.localStorage.getItem("currentUserId"),{
      isCharityMan:true,
      address:this.address,
      UserName:localStorage.getItem("UserName"),
      lat:this.currentLat,
      long:this.currentLong,
      location:this.location
    });
    this.presentAlert("Success Message", "Successfully Saved", "Ok");
  }

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
      window.localStorage.setItem("Place", this.address);
      

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

}
