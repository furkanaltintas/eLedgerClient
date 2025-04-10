import { Pipe, PipeTransform } from '@angular/core';
import { CustomerDetailModel } from '../models/customer-details/customer-detail.model';

@Pipe({
  name: 'customerDetail'
})
export class CustomerDetailPipe implements PipeTransform {

  transform(value: CustomerDetailModel[], search: string): CustomerDetailModel[] {
    if(!search) return value;

    return value.filter(c => c.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }
}
