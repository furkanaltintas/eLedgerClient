import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductPipe } from '../../../../pipes/product.pipe';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { SectionDescriptionComponent } from '../../../../layout/section-description/section-description.component';
import { CommonModule } from '@angular/common';
import { ProductModel } from '../../../../models/products/product.model';
import { SwalService } from '../../../../core/swal/swal.service';
import { HttpService } from '../../../../core/api/http.service';
import { PRODUCTS_ENDPOINT } from '../../../../constants/url-constants';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule,RouterLink, ProductPipe, SectionDescriptionComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: ProductModel[] = [];
  createModel: ProductModel = new ProductModel();
  updateModel: ProductModel = new ProductModel();
  search: string = '';

  @ViewChild('createModalCloseBtn') createModalCloseBtn:| ElementRef<HTMLButtonElement>| undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:| ElementRef<HTMLButtonElement>| undefined;

  constructor(
    private http: HttpService,
    private swal: SwalService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() {
    this.http.get<ProductModel[]>(PRODUCTS_ENDPOINT, (res) => {
      this.products = res.value!;
    });
  }

  get(model: ProductModel) {
    this.updateModel = { ...model };
  }

  create(form: NgForm) {
    debugger;
    if (form.valid) {
      this.http.post<string>(
        PRODUCTS_ENDPOINT,
        this.createModel,
        (res) => {
          this.swal.callToast(res.value!);
          this.createModel = new ProductModel();
          this.createModalCloseBtn?.nativeElement.click();
          this.loadProducts();
        }
      );
    }
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.put<string>(
        PRODUCTS_ENDPOINT,
        this.updateModel,
        (res) => {
          this.swal.callToast(res.value!);
          this.updateModel = new ProductModel();
          this.updateModalCloseBtn?.nativeElement.click();
          this.loadProducts();
        }
      );
    }
  }

  delete(model: ProductModel) {
    this.swal.deleteToast(
      "Ürünü Sil?",
      `${model.name} ürününü silmek istiyor musunuz ?`,
      () => {
        this.http.delete<string>(
          PRODUCTS_ENDPOINT,
          { id: model.id },
          (res) => {
            this.swal.callToast(res.value!, 'info');
            this.loadProducts();
          }
        );
      }
    );
  }
}
