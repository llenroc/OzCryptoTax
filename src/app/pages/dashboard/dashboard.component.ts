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
  public taxBrackets: TaxBracket[] = [];

  public capitalGains: CapitalGains = new CapitalGains();


  constructor() {
    this.setupTaxBrackets();
  }

  ngOnInit() { }

  //A crappy way to add the array
  private setupTaxBrackets() {
    var tb1 = new TaxBracket();
    tb1.taxableIncome = "0 – $18,200";
    tb1.taxOnThisIncome = "Nil";
    tb1.taxPerDollar = 0;
    tb1.baseTaxCost = 0;

    this.taxBrackets.push(tb1);
    
    var tb2 = new TaxBracket();
    tb2.taxableIncome = "$18,201 – $37,000";
    tb2.taxOnThisIncome = "19c for each $1 over $18,200";
    tb2.taxPerDollar = 19;
    tb2.baseTaxCost = 0;

    this.taxBrackets.push(tb2);

    var tb3 = new TaxBracket();
    tb3.taxableIncome = "$37,001 – $87,000";
    tb3.taxOnThisIncome = "$3,572 plus 32.5c for each $1 over $37,000";
    tb3.taxPerDollar = 32.5;
    tb3.baseTaxCost = 3572;

    this.taxBrackets.push(tb3);

    var tb4 = new TaxBracket();
    tb4.taxableIncome = "$87,001 – $180,000";
    tb4.taxOnThisIncome = "$19,822 plus 37c for each $1 over $87,000";
    tb4.taxPerDollar = 37;
    tb4.baseTaxCost = 19822;

    this.taxBrackets.push(tb4);

    var tb5 = new TaxBracket();
    tb5.taxableIncome = "$180,001 and over";
    tb5.taxOnThisIncome = "$54,232 plus 45c for each $1 over $180,000";
    tb5.taxPerDollar = 45;
    tb5.baseTaxCost = 54232;

    this.taxBrackets.push(tb5);
  }

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
  public income: number;
  public taxBracketOverride: boolean;
  public taxBracket: TaxBracket;
  public earnings: number;
  public taxableIncome: number;
  public events: CapitalGainEvent[] = [new CapitalGainEvent()];
}

export class CapitalGainEvent {
  public bought: PurchaseSellDetails = new PurchaseSellDetails();
  public sold: PurchaseSellDetails = new PurchaseSellDetails();
  public result: ResultingEvent = new ResultingEvent();
}

export class TaxBracket {
  public taxableIncome: string;
  public taxOnThisIncome: string;
  public baseTaxCost: number;
  public taxPerDollar: number;
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
