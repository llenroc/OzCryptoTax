
import {CapitalGainEvent} from '../../shared/classes/CapitalGainEvent';
import {FinalResult} from '../../shared/classes/FinalResult';
import {PurchaseSellDetails} from '../../shared/classes/PurchaseSellDetails';
import {ResultingEvent} from '../../shared/classes/ResultingEvent';
import {TaxBracket, TaxBrackets} from '../../shared/classes/TaxBracket';

export class CapitalGains {
    public income: number = 0;
    public taxBracketOverride: boolean = false;
    public select: any;
    public taxBracket: TaxBracket = new TaxBracket();
    public resultingTaxBracket: TaxBracket = new TaxBracket();
    public taxBrackets : TaxBrackets = new TaxBrackets();
    public earnings: number = 0;
    public taxableIncome: number=0;
    public isValid: boolean = false;
    public totalGains: FinalResult = new FinalResult();
    public events: CapitalGainEvent[] = [new CapitalGainEvent()];
  
    public calculateAllEvents() {
      var income = this.earnings;
      var taxableIncome = this.earnings;
      var capitalGains = 0;
      var capitalGainDiscounts = 0;
      var spareCoins = 0;
      this.totalGains.isValid = true;
  
      for (var i = 0; i < this.events.length; i++) {
        //Force calculation in case of fuckery
        this.events[i].calculateIndividualResultingEvent();
  
        if (!this.events[i].result.isValid) {
          this.totalGains.taxableIncome = -1;
          this.totalGains.income = -1;
          this.totalGains.gainDiscounts = -1;
          this.totalGains.gains = -1;
          this.totalGains.spareCoins = -1;
          this.totalGains.tax = -1;
          this.totalGains.isValid = false;
          this.resultingTaxBracket = this.taxBrackets[5];
          return;
        } else {
          income += this.events[i].result.gain;
          taxableIncome += this.events[i].result.taxableGain;
          capitalGains += this.events[i].result.gain;
          spareCoins += this.events[i].result.remaining;
          capitalGainDiscounts += (this.events[i].result.gain - this.events[i].result.taxableGain);
        }
  
        if (this.totalGains.isValid) {
          this.totalGains.taxableIncome = taxableIncome;
          this.totalGains.income = income;
          this.totalGains.gainDiscounts = capitalGainDiscounts;
          this.totalGains.gains = capitalGains;
          this.totalGains.spareCoins = spareCoins;
          this.totalGains.tax = ((taxableIncome - this.taxBracket.taxLevelWithCalculation) * this.taxBracket.taxPerDollar) + this.taxBracket.baseTaxCost;
        }
      }
    }
  }