import {Injectable} from '@angular/core'
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import * as firebase from "firebase";

@Injectable()
export class signUpService{
    private fireAuth:any;

    constructor(private http:Http){
        this.fireAuth = firebase.auth();
    }

    loadUser(email,password){
    }
}

