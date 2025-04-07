import { CompanyUserModel } from "../companies/company-user.model";
import { CompanyViewModel } from "../companies/company-view.model";

export class UserModel {
  id: string = "";
  firstName: string = "";
  lastName: string = "";
  fullName: string = "";
  userName: string = "";
  email: string = "";
  password?: string | null = "";
  companyId: string = "";
  isAdmin: boolean = false;
  companyIds: string[] = [];
  companies: CompanyViewModel[] = [];
  companyUsers: CompanyUserModel[] = [];
}
