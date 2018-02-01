import {PurchaseSellDetails} from '../../shared/classes/PurchaseSellDetails';
import {ResultingEvent} from '../../shared/classes/ResultingEvent';

export class CapitalGainEvent {
    public bought: PurchaseSellDetails = new PurchaseSellDetails();
    public sold: PurchaseSellDetails = new PurchaseSellDetails();
    public result: ResultingEvent = new ResultingEvent();
  }