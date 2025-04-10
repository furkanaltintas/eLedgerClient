import { Pipe, PipeTransform } from '@angular/core';
import { CustomerModel } from '../models/customers/customer.model';

@Pipe({
  name: 'customer'
})
export class CustomerPipe implements PipeTransform {

  transform(value: CustomerModel[], search: string): CustomerModel[] {
    if(!search) return value;

    return value.filter(c =>
      c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.city.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.town.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.fullAddress.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.taxDepartment.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.taxNumber.includes(search)
    );
  }
}
