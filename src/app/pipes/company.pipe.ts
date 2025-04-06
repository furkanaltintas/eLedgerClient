import { Pipe, PipeTransform } from '@angular/core';
import { CompanyModel } from '../models/companies/company.model';

@Pipe({
  name: 'company'
})
export class CompanyPipe implements PipeTransform {

  transform(value: CompanyModel[], search: string): CompanyModel[] {
    if(!search) return value;

    return value.filter(c =>
      c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.fullAddress.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.taxDepartment.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.taxNumber.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.database.server.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.database.databaseName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
}
