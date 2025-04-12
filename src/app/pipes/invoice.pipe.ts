import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceModel } from '../models/invoices/invoice.model';

@Pipe({
  name: 'invoice'
})
export class InvoicePipe implements PipeTransform {

  transform(value: InvoiceModel[], search: string): InvoiceModel[] {
    if(!search) return value;

    return value.filter(c =>
      c.customer.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.invoiceNumber.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
}
