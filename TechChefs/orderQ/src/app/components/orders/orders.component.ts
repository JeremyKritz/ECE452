import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {DataService} from '../../services/data.service';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
	orders: AngularFireList<any[]>;
	isSearch: boolean = false;
	ordObservable: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private router: Router, private dServe: DataService) {

	}

  ngOnInit() {
	   this.ordObservable = this.getOrd('/Orders');
    }
	getOrd(listPath): Observable<any[]> {
		return this.db.list(listPath).valueChanges();
  }
  orderReady(){
  }
  clearOrder1(){
  }
  clearOrder2(){
  }
  clearOrder3(){
  }
  toggSearch(){
  this.isSearch=!this.isSearch;
  }
  searchOrder(tNum){
    this.router.navigate(['/table/43']);
  }
  deleteOrder(){

  }
  logout(){
    this.dServe.logout();
  }
  viewInv(){
  this.router.navigate(['/inventory']);
  }
}
//JS Timer for the tickets
var iMill = document.getElementsByClassName("clock");//gets initial timestamp of order arrival
var initialize = true;//helps initialize time counter

function myTime() {
	//gets current time
	var cTime = new Date();
	var cMill = cTime.getTime();
	//takes initial time stamp and changes it into readable data(runs once)
	if(initialize){
		initialize = false;
		for(var i =0; i < iMill.length; i++){
			var tMill = cMill - Number(iMill[i].innerHTML);
			var tSec = Math.round(tMill/1000);
			var t2Sec = ++tSec%60;
			var tMin = Math.floor(tSec/60);
			var sec1 = t2Sec.toString();
			var min1 = tMin.toString();
			min1 = checkTime(min1);
			sec1 = checkTime(sec1);
			//expresses time in mm:ss
			document.getElementsByClassName("clock")[i].innerHTML  =  min1 + ":" + sec1;
		}
	}
	//updats all orders wait time in UI
	for(var i =0; i < iMill.length; i++){
		//gets time from what is currently displayed
		var pos = iMill[i].innerHTML.search(":");
		var min = Number(iMill[i].innerHTML.slice(0,pos));
		var sec = Number(iMill[i].innerHTML.slice(pos+1,iMill[i].innerHTML.length));
		//increments timer
		sec = (sec + 2);
		if( sec >= 60 ){
			sec = sec - 60;
			min = min + 1;
		}
		var sec1 = sec.toString();
		var min1 = min.toString();
		min1 = checkTime(min1);
		sec1 = checkTime(sec1);
		//prints time
		document.getElementsByClassName("clock")[i].innerHTML = min1 + ":" + sec1;
		//colors orders based on how long they have been waiting
		let  colElements = document.getElementsByClassName("column") as HTMLCollectionOf<HTMLElement>;
		if(min<7){
			colElements[i].style.backgroundColor = "white";
		}
		else if(min>=7&&min<10){
			colElements[i].style.backgroundColor = "yellow";
		}
		else if(min>=10){
			colElements[i].style.backgroundColor = "red";
		}
	}
}
//sets interval for timer 
setInterval(function(){myTime()}, 2000);

//helps format timer
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
