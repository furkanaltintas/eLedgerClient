import { CashRegisterDetailModel } from "../cash-register-details/cash-register-detail.model";
import { CurrencyTypeModel } from "./currency-type.model";

export class CashRegisterModel {
  id: string = "";
  name: string = "";
  depositAmount: number = 0;
  withdrawalAmount: number = 0;
  currencyTypeValue: number = 1;
  currencyType: CurrencyTypeModel = new CurrencyTypeModel();
  details: CashRegisterDetailModel[] = [];
}
