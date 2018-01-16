import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';



@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})

export class CalculatorComponent implements OnInit {
  public dashboard: any;
  public taxBrackets: TaxBracket[] = [];
  public capitalGains: CapitalGains = new CapitalGains();
  public loadedFromStorage: boolean = false;


  constructor() {
    this.setupTaxBrackets();
    this.capitalGains.earnings = 0;
    this.setTaxBracket(0);
    this.getCapitalGains();
  }

  ngOnInit() {}

  private setTaxBracket(earnings: number) {
    if (earnings <= 18200) {
      this.capitalGains.select = this.taxBrackets[0].taxableIncome;
      this.capitalGains.taxBracket = this.taxBrackets[0];
    } else if (earnings > 18200 && earnings <= 37000) {
      this.capitalGains.select = this.taxBrackets[1].taxableIncome;
      this.capitalGains.taxBracket = this.taxBrackets[1];
    } else if (earnings > 37000 && earnings <= 87000) {
      this.capitalGains.select = this.taxBrackets[2].taxableIncome;
      this.capitalGains.taxBracket = this.taxBrackets[2];
    } else if (earnings > 87000 && earnings <= 180000) {
      this.capitalGains.select = this.taxBrackets[3].taxableIncome;
      this.capitalGains.taxBracket = this.taxBrackets[3];
    } else if (earnings > 180000) {
      this.capitalGains.select = this.taxBrackets[4].taxableIncome;
      this.capitalGains.taxBracket = this.taxBrackets[4];
    }
  }

  //A crappy way to add the array
  private setupTaxBrackets() {
    var tb1 = new TaxBracket();
    tb1.taxableIncome = "0 – $18,200";
    tb1.taxOnThisIncome = "Nil";
    tb1.taxPerDollar = 0;
    tb1.baseTaxCost = 0;
    tb1.taxLevelWithCalculation = 0;

    this.taxBrackets.push(tb1);

    var tb2 = new TaxBracket();
    tb2.taxableIncome = "$18,201 – $37,000";
    tb2.taxOnThisIncome = "19c for each $1 over $18,200";
    tb2.taxPerDollar = 0.19;
    tb2.baseTaxCost = 0;
    tb2.taxLevelWithCalculation = 18200;


    this.taxBrackets.push(tb2);

    var tb3 = new TaxBracket();
    tb3.taxableIncome = "$37,001 – $87,000";
    tb3.taxOnThisIncome = "$3,572 plus 32.5c for each $1 over $37,000";
    tb3.taxPerDollar = 0.325;
    tb3.baseTaxCost = 3572;
    tb3.taxLevelWithCalculation = 37000;


    this.taxBrackets.push(tb3);

    var tb4 = new TaxBracket();
    tb4.taxableIncome = "$87,001 – $180,000";
    tb4.taxOnThisIncome = "$19,822 plus 37c for each $1 over $87,000";
    tb4.taxPerDollar = 0.37;
    tb4.baseTaxCost = 19822;
    tb4.taxLevelWithCalculation = 87000;


    this.taxBrackets.push(tb4);

    var tb5 = new TaxBracket();
    tb5.taxableIncome = "$180,001 and over";
    tb5.taxOnThisIncome = "$54,232 plus 45c for each $1 over $180,000";
    tb5.taxPerDollar = 0.45;
    tb5.baseTaxCost = 54232;
    tb5.taxLevelWithCalculation = 180000;


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
      event.result.isValid = true;
    this.setCapitalGains();
      

    } else {
      event.result.gain = -1;
      event.result.remaining = -1;
      event.result.taxableGain = -1;
      event.result.isValid = false;
    }
  }

  public setCapitalGains() {
    localStorage.setItem('capitalGains', JSON.stringify(this.capitalGains));
  }

  public getCapitalGains() {
    var gains: CapitalGains = JSON.parse(localStorage.getItem('capitalGains'));
    if (gains)
    {
      this.loadedFromStorage = true;
      this.capitalGains = gains;
      for (var i = 0; i < this.capitalGains.events.length; i++) {
        this.calculateIndividualResultingEvent(this.capitalGains.events[i]);
      }
    }  
  }

  public calculateAllEvents() {

    var income = this.capitalGains.earnings;
    var taxableIncome = this.capitalGains.earnings;
    var capitalGains = 0;
    var capitalGainDiscounts = 0;
    var spareCoins = 0;
    this.capitalGains.totalGains.isValid = true;

    for (var i = 0; i < this.capitalGains.events.length; i++) {
      //Force calculation in case of fuckery
      this.calculateIndividualResultingEvent(this.capitalGains.events[i]);

      if (!this.capitalGains.events[i].result.isValid) {
        this.capitalGains.totalGains.taxableIncome = -1;
        this.capitalGains.totalGains.income = -1;
        this.capitalGains.totalGains.gainDiscounts = -1;
        this.capitalGains.totalGains.gains = -1;
        this.capitalGains.totalGains.spareCoins = -1;
        this.capitalGains.totalGains.tax = -1;
        this.capitalGains.totalGains.isValid = false;
        this.capitalGains.resultingTaxBracket = this.taxBrackets[5];
        return;
      } else {
        income += this.capitalGains.events[i].result.gain;
        taxableIncome += this.capitalGains.events[i].result.taxableGain;
        capitalGains += this.capitalGains.events[i].result.gain;
        spareCoins += this.capitalGains.events[i].result.remaining;
        capitalGainDiscounts += (this.capitalGains.events[i].result.gain - this.capitalGains.events[i].result.taxableGain);
      }

      if (this.capitalGains.totalGains.isValid) {
        this.setTaxBracket(taxableIncome);
        this.capitalGains.totalGains.taxableIncome = taxableIncome;
        this.capitalGains.totalGains.income = income;
        this.capitalGains.totalGains.gainDiscounts = capitalGainDiscounts;
        this.capitalGains.totalGains.gains = capitalGains;
        this.capitalGains.totalGains.spareCoins = spareCoins;
        this.capitalGains.totalGains.tax = ((taxableIncome - this.capitalGains.taxBracket.taxLevelWithCalculation) * this.capitalGains.taxBracket.taxPerDollar) + this.capitalGains.taxBracket.baseTaxCost;
    this.setCapitalGains();
      }
    }
  }
} 

export class FinalResult {
  public spareCoins: number;
  public income: number;
  public taxableIncome: number;
  public gains: number;
  public gainDiscounts: number;
  public isValid: boolean;
  public tax: number;
}

export class CapitalGains {
  public income: number;
  public taxBracketOverride: boolean;
  public select: any;
  public taxBracket: TaxBracket;
  public resultingTaxBracket: TaxBracket;
  public earnings: number;
  public taxableIncome: number;
  public isValid: boolean;
  public totalGains: FinalResult = new FinalResult();
  public events: CapitalGainEvent[] = [new CapitalGainEvent()];
}

export class CapitalGainEvent {
  public id: number;
  public bought: PurchaseSellDetails = new PurchaseSellDetails();
  public sold: PurchaseSellDetails = new PurchaseSellDetails();
  public result: ResultingEvent = new ResultingEvent();
}

export class TaxBracket {
  public taxableIncome: string;
  public taxOnThisIncome: string;
  public baseTaxCost: number;
  public taxPerDollar: number;
  public taxLevelWithCalculation: number;
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
  public isValid: boolean;
}
