import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  public dashboard: any;
  public expanded: boolean = false;
  public taxableIncome: number;
  public linear: boolean = true;

  public capitalGains: CapitalGains;


  constructor() {}

  ngOnInit() {
      this.capitalGains = new CapitalGains();
  }

  public addEvent() {
    this.capitalGains.events.push(new CapitalGainEvent());
  }

  public removeEvent(event: any) {
    this.capitalGains.events.splice(this.capitalGains.events.indexOf(event), 1);
  }

}

export class CapitalGains {
    public income:any;
    public events:CapitalGainEvent[] = [new CapitalGainEvent()];
}

export class CapitalGainEvent {
    public bought:PurchaseSellDetails;
    public sold:PurchaseSellDetails;
    public result:ResultingEvent;

}

export class PurchaseSellDetails {
    public singleCost:number;
    public quantity:number;
    public date:Date;
}

export class ResultingEvent {
    public remaining:number;
    public gain:number;
    public taxableGain:number;
}