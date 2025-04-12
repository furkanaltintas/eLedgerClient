import { ProductDetailModel } from "../product-details/product-detail.model";

export class ProductModel {
  id: string = "";
  name: string = "";
  deposit: number = 0;
  withdrawal: number  = 0;
  details: ProductDetailModel[] = [];
}
