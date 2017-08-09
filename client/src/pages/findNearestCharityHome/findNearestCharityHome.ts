import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
//import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import * as MarkerClusterer from 'node-js-marker-clusterer';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { HaversineService, GeoCoord } from "ng2-haversine";
import { NavParams } from 'ionic-angular';
import { chatBoxpage } from '../chatBox/chatBox';

declare var google: any;

@Component({ 
  selector: 'charity',
  templateUrl: 'findNearestCharityHome.html',
  styles: [`#map{
      height:80%;
      width:100%;
  }`],
  //styleUrls:['./findNearestCharityHome.scss']
})
export class findNearestCharityHomePage {
  foodImage: any;
  time: any;
  date: any;
  food: any;
  Address: any;
  myDbProfileList: FirebaseListObservable<any[]>;

  public latitude: number;
  public longitude: number;
  mySelectedProfileDetails: any;
  //public searchControl: FormControl;
  public zoom: number;
  markerCluster: any;
  locations: any;
  AllhungerSpotInfo: any;
  foodQty;
  mapInitialised: boolean = false;
  map: any;
  allFoodDetail:any = "";

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController,private navParam:NavParams, private _haversineService: HaversineService, private alertController: AlertController, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public geolocation: Geolocation, private af: AngularFire) {
    this.myDbProfileList = af.database.list('/UsingProfiles');

    this.food = this.navParam.get('food');
    
    if(this.food != undefined){
      this.Address = this.navParam.get('Address');
      this.foodQty = this.navParam.get('foodQty');
      this.date = this.navParam.get('date');
      this.time = this.navParam.get('time');
      this.foodImage = this.navParam.get('foodImage');
      this.allFoodDetail = "Address : "+this.Address + ", Food :"+ this.food+", Food Quantity "+this.foodQty + ", Date : "+this.date + ", Time "+this.time;
    }
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        animation: google.maps.Animation,
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.latitude = parseFloat(window.localStorage.getItem("latTemp"));
      this.longitude = parseFloat(window.localStorage.getItem("longTemp"));

      if(this.latitude == undefined || this.longitude==undefined){
        this.latitude = 7.1271;
        this.longitude = 81.861;
      }

      this.locations =
        [
          { loct: [{ lat: this.latitude, lng: this.longitude}], Name: "Eheliyagoda", Review: 0.3,OpName:"Isuru" },
          { loct: [{ lat: 7.1271, lng: 81.861 }], Name: "Colombo", Review: 2.3,OpName:"Sahan" },
          { loct: [{ lat: 6.9061, lng: 79.9696 }], Name: "Weliwita", Review: 1.38 ,OpName:"Dilan"},
          { loct: [{ lat: 6.9195, lng: 79.9780 }], Name: "Kothalawala", Review: 4.5,OpName:"Sacheen" },
          { loct: [{ lat: 6.919, lng: 79.9672 }], Name: "Wihara Mawatha", Review: 2.3,OpName:"Ayesh" }
        ];

      this.addCluster(this.map);
    }, (err) => {
      console.log(err);
    });
  }

  getMyLocation() {

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        animation: google.maps.Animation,
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addCluster(this.map);
    }, (err) => {
      console.log(err);
    });


  }

  addCluster(map) {
    if (google.maps) {

      for (let item of this.locations) {
        console.log(item);
        //Convert locations into array of markers
        let markers = item.loct.map((location) => {
          let marker = new google.maps.Marker({
            position: location,
            animation: google.maps.Animation.DROP,
          });
          //console.log(location);
          let header = item.Name;
          let content = `
                <b>`+ header + `</b> <br>
                Name : `+item.OpName+` <br>
                <button  style='background-color:#428bca;color:white;padding:5px;'>Review : `+ item.Review + ` </button>
                `;
          this.addInfoWindow(marker, content, header,item.OpName);
          return marker;
        });
        this.markerCluster = new MarkerClusterer(map, markers, { imagePath: 'assets/m' });
      }
    }
  }

  addInfoWindow(marker, content, header,OpName) {

    let infoWindow = new google.maps.InfoWindow({
      content: content,
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
      this.sendMessage(header,OpName);
    });

  }
  sendMessage(header,OpName) {
    // if (this.isEnableCharity) {
    let newUserModel = this.alertController.create({
      title: header,
      message: "Send any message what you feel",
      inputs: [
        {
          name: "message",
          placeholder: "Message"
        }
      ],
      buttons: [
        {
          text: "Make a Contact",
          handler: data => {  

            let Sendingdata = {
              instantMessage : data.message,
              allFoodDetail: this.allFoodDetail,
              foodImg : "data:image/jpeg;base64,"+this.foodImage,
              Name: OpName
            }
             this.navCtrl.push(chatBoxpage,Sendingdata);
          }
        },
        {
          text: "Cancel",
          handler: data => {
            //this.isEnableCharity = false;
          }
        }
      ]
    });
    newUserModel.present(newUserModel)
  }

  tryHaversine(): void {

    let madrid: GeoCoord = {
      latitude: 40.416775,
      longitude: -3.703790
    };

    let bilbao: GeoCoord = {
      latitude: 43.262985,
      longitude: -2.935013
    };

    let meters = this._haversineService.getDistanceInMeters(madrid, bilbao);
    let kilometers = this._haversineService.getDistanceInKilometers(madrid, bilbao);
    let miles = this._haversineService.getDistanceInMiles(madrid, bilbao);

    console.log(`
        The distance between Madrid and Bilbao is:
            - ${meters} meters
            - ${kilometers} kilometers
            - ${miles} miles
    `);
  }
}
