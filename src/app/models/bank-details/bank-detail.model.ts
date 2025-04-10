import { BankModel } from "../banks/bank.model";
import { CashRegisterModel } from "../cash-registers/cash-register.model";

export class BankDetailModel {
  id: string = "";
  bankId: string = "";
  description: string = "";
  date: string = "";
  type: number = 0;
  amount: number = 0 ;
  depositAmount: number = 0;
  withdrawalAmount: number = 0;
  oppositeAmount: number = 0;
  bankDetailId: string = "";
  cashRegisterDetailId: string = "";
  customerDetailId: string = "";
  oppositeCashRegisterId: string | any = "";
  oppositeBankId: string | any = "";
  oppositeCustomerId: string | any = "";
  recordType: number = 0;
  oppositeBank: BankModel = new BankModel();
  oppositeCash: CashRegisterModel = new CashRegisterModel();
}
