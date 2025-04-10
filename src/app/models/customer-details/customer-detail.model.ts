export class CustomerDetailModel {
  id: string = "";
  date: string = "";
  description: string = "";
  depositAmount: number = 0;
  withdrawalAmount: number = 0;
  bankDetailId: string = "";
  cashRegisterDetailId: string = "";
  type: CustomerDetailTypeEnum = new CustomerDetailTypeEnum();
}

export class CustomerDetailTypeEnum {
  name: string = "";
  value: number = 1;
}
