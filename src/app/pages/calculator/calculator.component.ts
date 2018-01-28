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
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})

export class CalculatorComponent implements OnInit {
  public dashboard: any;
  public taxBracketsObj: TaxBrackets = new TaxBrackets();
  public capitalGains: CapitalGains = new CapitalGains();
  public loadedFromStorage: boolean = false;


  constructor() {
    this.capitalGains.earnings = 0;
    this.getCapitalGains();
    if (!this.capitalGains) {
      this.capitalGains = new CapitalGains();
    }
    if (this.capitalGains.isValid) {
      this.setTaxBracket(this.capitalGains.taxableIncome);
    } else if (this.capitalGains.earnings > 0) {
      this.setTaxBracket(this.capitalGains.earnings);
    }
  }

  ngOnInit() {}

  public setTaxBracket(earnings: number) {
    this.taxBracketsObj.setupTaxBrackets();
    if (earnings <= 18200) {
      this.capitalGains.select = this.taxBracketsObj.taxBrackets[0].taxableIncome;
      this.capitalGains.taxBracket = this.taxBracketsObj.taxBrackets[0];
    } else if (earnings > 18200 && earnings <= 37000) {
      this.capitalGains.select = this.taxBracketsObj.taxBrackets[1].taxableIncome;
      this.capitalGains.taxBracket = this.taxBracketsObj.taxBrackets[1];
    } else if (earnings > 37000 && earnings <= 87000) {
      this.capitalGains.select = this.taxBracketsObj.taxBrackets[2].taxableIncome;
      this.capitalGains.taxBracket = this.taxBracketsObj.taxBrackets[2];
    } else if (earnings > 87000 && earnings <= 180000) {
      this.capitalGains.select = this.taxBracketsObj.taxBrackets[3].taxableIncome;
      this.capitalGains.taxBracket = this.taxBracketsObj.taxBrackets[3];
    } else if (earnings > 180000) {
      this.capitalGains.select = this.taxBracketsObj.taxBrackets[4].taxableIncome;
      this.capitalGains.taxBracket = this.taxBracketsObj.taxBrackets[4];
    }
  }

  public addEvent() {
    this.capitalGains.events.push(new CapitalGainEvent());
  }

  public removeEvent(event: any) {
    this.capitalGains.events.splice(this.capitalGains.events.indexOf(event), 1);
  }

  public calculateAllEvents() {
    this.capitalGains.calculateAllEvents();
    this.setTaxBracket(this.capitalGains.taxableIncome);
    this.setCapitalGains();
  }

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
      for (var i = 0; i < this.capitalGains.events.length; i++) {
        this.capitalGains.events[i].calculateIndividualResultingEvent();
      }
    } else {
      this.loadedFromStorage = false;
      this.capitalGains = new CapitalGains();
    }
  }
}
