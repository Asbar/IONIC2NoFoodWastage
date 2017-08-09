import {Injectable} from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class addHungerSpotService{
    constructor(private http:Http){
        
    }
    saveHungerSpots(){
        var json = JSON.stringify({var1:"test1",var2:"test2"});
        var param = "json="+json;
        var headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');

        return this.http.post('www.asbarali.com',param,
        {
            headers :headers
        }
        ).map(res=>res.json());
    }   

    AddHungerSpots(location,mobile,address,numPeople,latlang){
    var data = [{location:location,mobile:mobile,address:address,numPeople:numPeople,latlang:latlang}]
    console.log('masuk ke service');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(data);
    return this.http.post('http://localhost:8100/api/save', data,
     {
            headers :headers
    }
     ).map(res=>res.json());
  }
}