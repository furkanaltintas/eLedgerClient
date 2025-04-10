import { BankModel } from "../banks/bank.model";
import { CashRegisterModel } from "../cash-registers/cash-register.model";

export class CashRegisterDetailModel {
  id: string = "";
  cashRegisterId: string = "";
  description: string = "";
  date: string = "";
  type: number = 0;
  amount: number = 0 ;
  depositAmount: number = 0;
  withdrawalAmount: number = 0;
  oppositeAmount: number = 0;
  bankDetailId: string = "";
  customerDetailId: string  = "";
  cashRegisterDetailId: string = "";
  oppositeCashRegisterId: string | any = "";
  oppositeBankId: string | any = "";
  oppositeCustomerId: string | any = "";
  oppositeBank: BankModel = new BankModel();
  recordType: number = 0;
  oppositeCashRegister: CashRegisterModel = new CashRegisterModel();
}
