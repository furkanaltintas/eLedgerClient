import { Pipe, PipeTransform } from '@angular/core';
import { CashRegisterDetailModel } from '../models/cash-register-details/cash-register-detail.model';

@Pipe({
  name: 'cashRegisterDetail'
})
export class CashRegisterDetailPipe implements PipeTransform {

  transform(value: CashRegisterDetailModel[], search: string): CashRegisterDetailModel[] {
    if(!search) return value;

    return value.filter(c => c.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }

}
