import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { myProfilePage } from '../MyProfile/MyProfile';
import { AngularFire, FirebaseListObservable, AuthMethods, AuthProviders } from 'angularfire2';
import { signUpPage } from '../signUp/signUp';

@Component({
  selector: 'page-home',
  templateUrl: 'login.html',
})
export class loginPage {
  myDbProfile: FirebaseListObservable<any[]>;

  email: any;
  password: any;

  loginDetails: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public alertController: AlertController, public af: AngularFire) {
    this.loginDetails = af.database.list('/login');
    this.myDbProfile = af.database.list('/UsingProfiles');
  }
  moveto() {
    this.navCtrl.push(myProfilePage);
  }
  moveSignUp() {
    this.navCtrl.push(signUpPage);
  }

  login() {
    if (this.email == undefined) {
      this.presentAlert("Error", "Email field is Empty", "Ok")
      return;
    } else if (this.password == undefined) {
      this.presentAlert("Error", "Password field is Empty", "Ok")
      return;
    }

    this.af.auth.login({
      email: this.email,
      password: this.password
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((response) => {
        
        //console.log("Login success" + JSON.stringify(response));
        let currentuser =response.auth.email;
        currentuser = currentuser.toString().replace(/['"]+/g, '');
        window.localStorage.setItem('currentuser', currentuser);
        
        const [Name] = currentuser.split('@');
        console.log(Name);
        this.navCtrl.pop();

        
        window.localStorage.setItem('UserName',Name.charAt(0).toUpperCase()+Name.substr(1).toLowerCase());

      }).catch((error) => {
        this.presentAlert("Error", "Invalid UserName or Password", "Ok")
        return;
    
      });
      
  }
 presentAlert(Title, SubTitle, button) {
    let alert = this.alertController.create({
      title: Title,
      subTitle: SubTitle,
      buttons: [button]
    });
    alert.present();
  }


  loginWithFacebook(){

    this.af.auth.login({
      provider :AuthProviders.Facebook,
      method:AuthMethods.Popup
    }).then((response)=>{
      console.log("Login Success with facebook" + JSON.stringify(response));
       console.log("Login success" + JSON.stringify(response));
        let currentuser =response.auth.displayName;
        console.log(response.auth); 
        currentuser = currentuser.toString().replace(/['"]+/g, '');
        window.localStorage.setItem('currentuser', response.auth.email);
        window.localStorage.setItem('currentUserProf', response.auth.photoURL);
        
        const [Name,Unwanted] = currentuser.split('@');
        console.log(Unwanted);
        console.log(Name);
        this.navCtrl.pop();

        window.localStorage.setItem('UserName',Name.charAt(0).toUpperCase()+Name.substr(1).toLowerCase());

      }).catch((error) => {
        console.log(error);
      });
  }

}
