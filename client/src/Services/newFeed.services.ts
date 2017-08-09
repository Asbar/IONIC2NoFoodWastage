import {Injectable} from '@angular/core'
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class newsFeedService{
    constructor(private http:Http){
        
    }
    getAllNewsFeed(){
        return this.http.get('http://localhost:3000/api/newsfeed')
            .map(res=>res.json());
    }
}