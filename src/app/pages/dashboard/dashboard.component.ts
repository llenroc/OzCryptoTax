import {Component, OnInit }from '@angular/core'; 

@Component( {
selector:'app-dashboard', 
templateUrl:'./dashboard.component.html', 
styleUrls:['./dashboard.component.scss'], 
})

export class DashboardComponent implements OnInit {
public dashboard:any;
public expanded:boolean = false;
public events:any[] = [];
public taxableIncome:number;

constructor() {
}

ngOnInit() {
}

public addEvent() {
    this.events.push({});
}


}


