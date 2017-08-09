import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { newsFeedService } from '../../Services/newFeed.services';

@Component({
  selector: 'newFeed',
  templateUrl: 'newFeed.html',
  
})
export class newFeedpage {


    newItems:Array<string> = [];
    public logError:any;

  constructor(public navParam: NavParams,private newsFeedSer:newsFeedService) {

    this.newsFeedSer.getAllNewsFeed().subscribe(
            data => {this.newItems = data},
            err => this.logError(err),
            () =>  this.newItems.forEach(element => {
                //this.tasks.push({"title":tasks.title,"isDone":tasks.isDone});    
        }));
  }

}
