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
  }