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
  cashRegisterDetailId: string = "";
  oppositeCashRegisterId: string | any = "";
  recordType: number = 0;
  oppositeCashRegister: CashRegisterModel = new CashRegisterModel();
}
