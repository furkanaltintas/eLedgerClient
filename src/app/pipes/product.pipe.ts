import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../models/products/product.model';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {

  transform(value: ProductModel[], search: string): ProductModel[] {
    if(!search) return value;

    return value.filter(p =>
      p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

}
