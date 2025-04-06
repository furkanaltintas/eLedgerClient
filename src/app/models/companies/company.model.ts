export class CompanyModel {
  id: string = "";
  name: string = "";
  fullAddress: string = "";
  taxDepartment: string = "";
  taxNumber: string = "";
  database: DatabaseModel = new DatabaseModel();
  isDelete: boolean = false;
}

export class DatabaseModel {
  server: string = "";
  databaseName: string = "";
  userId: string = "";
  password: string = "";
}
