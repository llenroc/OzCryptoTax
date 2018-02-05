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
    public realisedEvents: CapitalGainEvent[] = [];
    public buyEvents: PurchaseSellDetails[] = [new PurchaseSellDetails()];
    public sellEvents: PurchaseSellDetails[] = [];
    public isValidSellEvent : boolean = true;

    

  public addEvent() {
    this.realisedEvents.push(new CapitalGainEvent());
  }

  public removeEvent(event: any) {
    this.realisedEvents.splice(this.realisedEvents.indexOf(event), 1);
  }

  public addBuyEvent() {
    this.buyEvents.push(new PurchaseSellDetails());
  }

  public removeBuyEvent(event: any) {
    this.buyEvents.splice(this.buyEvents.indexOf(event), 1);
  }


  public addSellEvent() {
    this.sellEvents.push(new PurchaseSellDetails());
  }

  public removeSellEvent(event: any) {
    this.sellEvents.splice(this.sellEvents.indexOf(event), 1);
  }
  
    public calculateAllEvents() {
      var income = this.earnings;
      var taxableIncome = this.earnings;
      var capitalGains = 0;
      var capitalGainDiscounts = 0;
      var spareCoins = 0;
      this.totalGains.isValid = true;
  
      for (var i = 0; i < this.realisedEvents.length; i++) {
        //Force calculation in case of fuckery
        this.calculateIndividualResultingEvent(this.realisedEvents[i]);
  
        if (!this.realisedEvents[i].result.isValid) {
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
          income += this.realisedEvents[i].result.gain;
          taxableIncome += this.realisedEvents[i].result.taxableGain;
          capitalGains += this.realisedEvents[i].result.gain;
          spareCoins += this.realisedEvents[i].result.remaining;
          capitalGainDiscounts += (this.realisedEvents[i].result.gain - this.realisedEvents[i].result.taxableGain);
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
      this.setTaxBracket();
      localStorage.setItem('capitalGains', JSON.stringify(this));
    }

    public setTaxBracket() {
      this.taxBrackets.setupTaxBrackets();
      if (this.earnings <= 18200) {
        this.select = this.taxBrackets.taxBrackets[0].taxableIncome;
        this.taxBracket = this.taxBrackets.taxBrackets[0];
      } else if (this.earnings > 18200 && this.earnings <= 37000) {
        this.select = this.taxBrackets.taxBrackets[1].taxableIncome;
        this.taxBracket = this.taxBrackets.taxBrackets[1];
      } else if (this.earnings > 37000 && this.earnings <= 87000) {
        this.select = this.taxBrackets.taxBrackets[2].taxableIncome;
        this.taxBracket = this.taxBrackets.taxBrackets[2];
      } else if (this.earnings > 87000 && this.earnings <= 180000) {
        this.select = this.taxBrackets.taxBrackets[3].taxableIncome;
        this.taxBracket = this.taxBrackets.taxBrackets[3];
      } else if (this.earnings > 180000) {
        this.select = this.taxBrackets.taxBrackets[4].taxableIncome;
        this.taxBracket = this.taxBrackets.taxBrackets[4];
      }
    }

    public calculateIndividualResultingEvent(gain : CapitalGainEvent) {
  
      if (gain.bought.date &&
        gain.bought.quantity &&
        gain.bought.singleCost &&
        gain.sold.date &&
        gain.sold.quantity &&
        gain.sold.singleCost) {
        //calculate
        var dateDifference: number = new Date(gain.sold.date).getTime() - new Date(gain.bought.date).getTime();
  
        var minutes = 1000 * 60;
        var hours = minutes * 60;
        var days = hours * 24;
        var years = days * 365;
  
        gain.result.gain = (gain.sold.quantity * gain.sold.singleCost) - (gain.bought.singleCost * gain.sold.quantity);
  
        var yearDifference: number = dateDifference / years;
        if (yearDifference >= 1) {
          gain.result.discount = "50%";
          gain.result.taxableGain = gain.result.gain * 0.5;
        } else {
          gain.result.discount = "0%";
          gain.result.taxableGain = gain.result.gain;
        }
  
        gain.result.remaining = gain.bought.quantity - gain.sold.quantity;
        gain.result.isValid = true;
      //gain.setCapitalGains();
      } else {
        gain.result.gain = -1;
        gain.result.remaining = -1;
        gain.result.taxableGain = -1;
        gain.result.isValid = false;
      }
    }
  }