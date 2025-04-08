import { Pipe, PipeTransform } from '@angular/core';
import { BankModel } from '../models/banks/bank.model';

@Pipe({
  name: 'bank'
})
export class BankPipe implements PipeTransform {

  transform(value: BankModel[], search: string): BankModel[] {
    if(!search) return value;

    return value.filter(c =>
      c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.iban.includes(search)
    );
  }
}
