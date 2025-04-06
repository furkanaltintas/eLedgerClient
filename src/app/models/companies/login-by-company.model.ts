export class LoginByCompanyModel {
  userId: string = "";
  companyId: string = "";

  constructor(userId: string, companyId: string) {
    this.userId = userId;
    this.companyId = companyId;
  }
}
