import { Component } from '@angular/core';
import { NavController,AlertController,Loading,LoadingController } from 'ionic-angular';  
import { AngularFire,FirebaseListObservable } from 'angularfire2';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
//import { ValidationService } from './emailValidator';
import * as firebase from 'firebase';
import { loginPage } from '../login/login';

@Component({
  selector: 'signUp',
  templateUrl: 'signUp.html',
})
export class signUpPage {

  loginDetails : FirebaseListObservable<any>;
  UsingProfiles: FirebaseListObservable<any>;
  private signupForm: FormGroup;
  loading: Loading;
  
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public alertController:AlertController,private af:AngularFire,private formBuilder:FormBuilder) {

    this.loginDetails = af.database.list('/login');
    this.UsingProfiles = af.database.list('/UsingProfiles');
    
    this.signupForm = this.formBuilder.group({
        FullName:['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        Email:['',Validators.compose([Validators.maxLength(30), Validators.required])],
        MobileNum:['',Validators.compose([Validators.maxLength(50), Validators.required])],
        Password:['',Validators.compose([Validators.maxLength(50), Validators.required])],
     });
  }

signupUser(){
  if (!this.signupForm.valid){
    console.log(this.signupForm.value);
  } else {

     var passwdTemp = this.signupForm.value["Password"]
     var emailTemp = this.signupForm.value["Email"];
     
     emailTemp = emailTemp.toLowerCase();

     if(passwdTemp=="" || emailTemp == ""){
        this.presentAlert("Error", "Email or Password field is Empty", "Ok")
        return;
     }

     firebase.auth().createUserWithEmailAndPassword(emailTemp,passwdTemp)
    .then( newUser => {
        firebase.database().ref('/userProfile').child(newUser.uid)
        .set({ email: emailTemp,profImg:"http://350cr.blogs.brynmawr.edu/files/2013/05/anonymous.jpg",
        rateLevel:0,
        location:"N/A",
        ratedUsers:5,isCharityMan:false
         });
         this.UsingProfiles.push({ email: emailTemp,
           profImg:"http://350cr.blogs.brynmawr.edu/files/2013/05/anonymous.jpg",
           rateLevel:0,
           location:"N/A",
           ratedUsers:0,
           isCharityMan:false})
    }, (err) => {
        this.presentAlert("Error",err,"Ok");
    });
    // this.loading = this.loadingCtrl.create();
    // this.loading.present();
    this.navCtrl.push(loginPage);
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

}
