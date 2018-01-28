import {
  $
} from "protractor";

export class TaxBracket {
  public taxableIncome: string;
  public taxOnThisIncome: string;
  public baseTaxCost: number;
  public taxPerDollar: number;
  public taxLevelWithCalculation: number;


}

export class TaxBrackets {
  public taxBrackets: TaxBracket[] = new Array<TaxBracket>();

  public TaxBrackets() {
    this.setupTaxBrackets();
  }

  //A crappy way to add the array
  public setupTaxBrackets() {
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
}
