import { BankModel } from "../banks/bank.model";

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
  oppositeBankId: string | any = "";
  recordType: number = 0;
  oppositeBank: BankModel = new BankModel();
}
