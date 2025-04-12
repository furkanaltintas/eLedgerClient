import { Component } from '@angular/core';
import { ProductModel } from '../../../../models/products/product.model';
import { HttpService } from '../../../../core/api/http.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailPipe } from '../../../../pipes/product-detail.pipe';
import { FormsModule } from '@angular/forms';
import { SectionDescriptionComponent } from '../../../../layout/section-description/section-description.component';
import { CommonModule } from '@angular/common';
import { PRODUCT_DETAILS_ENDPOINT } from '../../../../constants/url-constants';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, FormsModule, ProductDetailPipe, SectionDescriptionComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product: ProductModel = new ProductModel();
  productId: string = "";
  search: string = '';

  constructor(
    private http: HttpService,
    private activated: ActivatedRoute,
  ) {
    this.activated.params.subscribe(res => {
      this.productId = res["id"];
    });

    this.getAll();
  }

  getAll() {
    this.http.get<ProductModel>(PRODUCT_DETAILS_ENDPOINT, (res) => {
      this.product = res.value!;
    }, { productId: this.productId});
  }
}
