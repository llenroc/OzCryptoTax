import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  DataSource
} from '@angular/cdk/collections';
import {
  Observable
} from 'rxjs/Observable';
import {
  CapitalGains
} from '../../shared/classes/CapitalGains';
import {
  CapitalGainEvent
} from '../../shared/classes/CapitalGainEvent';
import {
  FinalResult
} from '../../shared/classes/FinalResult';
import {
  PurchaseSellDetails
} from '../../shared/classes/PurchaseSellDetails';
import {
  ResultingEvent
} from '../../shared/classes/ResultingEvent';
import {
  TaxBracket,
  TaxBrackets
} from '../../shared/classes/TaxBracket';
import 'rxjs/add/observable/of';



@Component({
  selector: 'app-pro-calculator',
  templateUrl: './pro-calculator.component.html',
  styleUrls: ['./pro-calculator.component.scss'],
})

export class ProCalculatorComponent implements OnInit {
  public dashboard: any;
  public taxBracketsObj: TaxBrackets = new TaxBrackets();
  public capitalGains: CapitalGains = new CapitalGains();
  public loadedFromStorage: boolean = false;
  public sellEvents: SellEventHolder[] = [];


  constructor() {
    this.capitalGains.earnings = 0;

    this.getCapitalGains();
    this.capitalGains.taxBrackets = new TaxBrackets();
    if (!this.capitalGains) {
      this.capitalGains = new CapitalGains();
    }
      this.capitalGains.setTaxBracket();
  }

  public addSell() {
    var event: SellEventHolder;
    event = new SellEventHolder();
    event.details = new PurchaseSellDetails();
    event.event = new CapitalGainEvent();
    this.sellEvents.push(event);
  }

  public removeSell(event) {
    this.sellEvents.splice(this.sellEvents.indexOf(event), 1);
  }

  ngOnInit() {}

  public setCapitalGains() {
    localStorage.setItem('capitalGains', JSON.stringify(this.capitalGains));
  }

  public fromJSON(json: CapitalGains): CapitalGains {

    var result = new CapitalGains();

    for (var key in json) {
        if(result.hasOwnProperty(key)) {
            result[key] = json[key]
        }
    }

    return result;
}

  public getCapitalGains() {
    var localStorageItem = localStorage.getItem('capitalGains');
    var what = <CapitalGains>JSON.parse(localStorageItem);
    this.capitalGains = this.fromJSON(what);

    if (this.capitalGains) {
      this.loadedFromStorage = true;
      this.capitalGains.events = <Array<CapitalGainEvent>>this.capitalGains.events;
      for (var i = 0; i < this.capitalGains.events.length; i++) {
        this.capitalGains.calculateIndividualResultingEvent(this.capitalGains.events[i])
      }
    } else {
      this.loadedFromStorage = false;
      this.capitalGains = new CapitalGains();
    }
  }
}



export class SellEventHolder {
  public event: CapitalGainEvent;
  public details: PurchaseSellDetails;

  public SellEventHolder() {
    this.details = new PurchaseSellDetails();
  }
}
