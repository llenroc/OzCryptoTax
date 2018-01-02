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

  public capitalGains: CapitalGains = new CapitalGains();


  constructor() {}

  ngOnInit() {}

  public addEvent() {
    this.capitalGains.events.push(new CapitalGainEvent());
  }

  public removeEvent(event: any) {
    this.capitalGains.events.splice(this.capitalGains.events.indexOf(event), 1);
  }

  public calculateIndividualResultingEvent(event: CapitalGainEvent) {
    if (event.bought.date &&
      event.bought.quantity &&
      event.bought.singleCost &&
      event.sold.date &&
      event.sold.quantity &&
      event.sold.singleCost) {
      //calculate
      var dateDifference: number = new Date(event.sold.date).getTime() - new Date(event.bought.date).getTime();
      
      var minutes = 1000 * 60;
      var hours = minutes * 60;
      var days = hours * 24;
      var years = days * 365;

      event.result.gain = (event.sold.quantity * event.sold.singleCost) - (event.bought.singleCost * event.sold.quantity);

      var yearDifference: number = dateDifference / years;
      if (yearDifference >= 1) {
      event.result.discount = "50%";
      event.result.taxableGain = event.result.gain * 0.5;
      } else {
      event.result.discount = "0%";
      event.result.taxableGain = event.result.gain;
      }


      event.result.remaining = event.bought.quantity - event.sold.quantity;

    } else {
      event.result.gain = -1;
      event.result.remaining = -1;
      event.result.taxableGain = -1;
    }
  }


}

export class CapitalGains {
  public income: any;
  public events: CapitalGainEvent[] = [new CapitalGainEvent()];
}

export class CapitalGainEvent {
  public bought: PurchaseSellDetails = new PurchaseSellDetails();
  public sold: PurchaseSellDetails = new PurchaseSellDetails();
  public result: ResultingEvent = new ResultingEvent();

}

export class PurchaseSellDetails {
  public singleCost: number;
  public quantity: number;
  public date: Date;
}

export class ResultingEvent {
  public remaining: number;
  public gain: number;
  public taxableGain: number;
  public discount: string;
}
