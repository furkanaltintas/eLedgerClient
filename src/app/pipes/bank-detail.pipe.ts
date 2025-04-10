import { Pipe, PipeTransform } from '@angular/core';
import { BankDetailModel } from '../models/bank-details/bank-detail.model';

@Pipe({
  name: 'bankDetail'
})
export class BankDetailPipe implements PipeTransform {

  transform(value: BankDetailModel[], search: string): BankDetailModel[] {
    if(!search) return value;

    return value.filter(c => c.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }
}
