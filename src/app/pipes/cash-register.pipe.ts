import { Pipe, PipeTransform } from '@angular/core';
import { CashRegisterModel } from '../models/cash-registers/cash-register.model';

@Pipe({
  name: 'cashRegister'
})
export class CashRegisterPipe implements PipeTransform {

  transform(value: CashRegisterModel[], search: string): CashRegisterModel[] {
    if(!search) return value;

    return value.filter(c => c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()
  ));
  }

}
