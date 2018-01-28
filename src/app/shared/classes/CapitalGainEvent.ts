import {PurchaseSellDetails} from '../../shared/classes/PurchaseSellDetails';
import {ResultingEvent} from '../../shared/classes/ResultingEvent';

export interface ICapitalGainEvent {
  id:number;
  bought:PurchaseSellDetails;
  sold:PurchaseSellDetails;
  result:ResultingEvent;

  calculateIndividualResultingEvent()
}

export class CapitalGainEvent {
    public id: number;
    public bought: PurchaseSellDetails = new PurchaseSellDetails();
    public sold: PurchaseSellDetails = new PurchaseSellDetails();
    public result: ResultingEvent = new ResultingEvent();
  
    public calculateIndividualResultingEvent() {
  
      if (this.bought.date &&
        this.bought.quantity &&
        this.bought.singleCost &&
        this.sold.date &&
        this.sold.quantity &&
        this.sold.singleCost) {
        //calculate
        var dateDifference: number = new Date(this.sold.date).getTime() - new Date(this.bought.date).getTime();
  
        var minutes = 1000 * 60;
        var hours = minutes * 60;
        var days = hours * 24;
        var years = days * 365;
  
        this.result.gain = (this.sold.quantity * this.sold.singleCost) - (this.bought.singleCost * this.sold.quantity);
  
        var yearDifference: number = dateDifference / years;
        if (yearDifference >= 1) {
          this.result.discount = "50%";
          this.result.taxableGain = this.result.gain * 0.5;
        } else {
          this.result.discount = "0%";
          this.result.taxableGain = this.result.gain;
        }
  
        this.result.remaining = this.bought.quantity - this.sold.quantity;
        this.result.isValid = true;
    //this.setCapitalGains();
      } else {
        this.result.gain = -1;
        this.result.remaining = -1;
        this.result.taxableGain = -1;
        this.result.isValid = false;
      }
    }
  }