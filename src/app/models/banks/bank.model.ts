import { BankDetailModel } from "../bank-detail/bank-detail.model";
import { CurrencyTypeModel } from "../cash-registers/currency-type.model";

export class BankModel {
  id: string = "";
  name: string = "";
  iban: string = "";
  depositAmount: number = 0;
  withdrawalAmount: number = 0;
  currencyTypeValue: number = 1;
  currencyType: CurrencyTypeModel  = new CurrencyTypeModel();
  details: BankDetailModel[] = [];
}
