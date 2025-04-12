import { Pipe, PipeTransform } from '@angular/core';
import { ProductDetailModel } from '../models/product-details/product-detail.model';

@Pipe({
  name: 'productDetail'
})
export class ProductDetailPipe implements PipeTransform {

  transform(value: ProductDetailModel[], search: string): ProductDetailModel[] {
    if(!search) return value;

    return value.filter(c => c.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }
}
