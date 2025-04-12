import { Component, ElementRef, ViewChild } from '@angular/core';
import { InvoicePipe } from '../../../../pipes/invoice.pipe';
import { InvoiceModel } from '../../../../models/invoices/invoice.model';
import { HttpService } from '../../../../core/api/http.service';
import { SwalService } from '../../../../core/swal/swal.service';
import { CUSTOMERS_ENDPOINT, INVOICES_ENDPOINT, PRODUCTS_ENDPOINT } from '../../../../constants/url-constants';
import { CustomerModel } from '../../../../models/customers/customer.model';
import { ProductModel } from '../../../../models/products/product.model';
import { InvoiceDetailModel } from '../../../../models/invoice-details/invoice-detail.model';
import { SharedModule } from '../../../../core/modules/shared/shared.module';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-invoices',
  imports: [SharedModule, InvoicePipe],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css',
  providers: [DatePipe]
})
export class InvoicesComponent {
  invoices: InvoiceModel[] = [];
  customers: CustomerModel[] = [];
  products: ProductModel[] = [];
  createModel: InvoiceModel = new InvoiceModel();
  updateModel: InvoiceModel = new InvoiceModel();
  search: string = '';
  p: number = 1;

  @ViewChild('createModalCloseBtn') createModalCloseBtn:| ElementRef<HTMLButtonElement>| undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:| ElementRef<HTMLButtonElement>| undefined;

  constructor(
    private http: HttpService,
    private swal: SwalService,
    private date: DatePipe) {
      this.createModel.date  = date.transform(new Date(), "yyyy-MM-dd") ?? "";
    }

  ngOnInit(): void {
    this.loadInvoices();
    this.loadCustomers();
    this.loadProducts();
  }

  private loadInvoices() {
    this.http.get<InvoiceModel[]>(INVOICES_ENDPOINT, (res) => {
      this.invoices = res.value!;
    });
  }

  private loadCustomers() {
    this.http.get<CustomerModel[]>(CUSTOMERS_ENDPOINT, (res) => {
      this.customers = res.value!;
    });
  }

  private loadProducts() {
    this.http.get<ProductModel[]>(PRODUCTS_ENDPOINT, (res) => {
      this.products = res.value!;
    });
  }

  get(model: InvoiceModel) {
    debugger;
    this.updateModel = { ...model };
    this.updateModel.details = [...model.details];
    this.updateModel.typeValue = model.type.value;
    this.updateModel.quantity = 0;
    this.updateModel.price = 0;
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>(
        INVOICES_ENDPOINT,
        this.createModel,
        (res) => {
          this.swal.callToast(res.value!);
          this.createModel = new InvoiceModel();
          this.createModalCloseBtn?.nativeElement.click();
          this.createModel.date  = this.date.transform(new Date(), "yyyy-MM-dd") ?? "";
          this.loadInvoices();
        }
      );
    }
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.delete<string>(
        INVOICES_ENDPOINT,
        { id: this.updateModel.id },
        (res) => {
          this.http.post<string>(
            INVOICES_ENDPOINT,
            this.updateModel,
            (res) => {
              this.swal.callToast(res.value!);
              this.updateModalCloseBtn?.nativeElement.click();
              this.loadInvoices();
            }
          );
        }
      );
    }
  }

  delete(model: InvoiceModel) {
    this.swal.deleteToast(
      "Faturayı Sil?",
      `${model.invoiceNumber} numaralı faturayı silmek istiyor musunuz ?`,
      () => {
        this.http.delete<string>(
          INVOICES_ENDPOINT,
          { id: model.id },
          (res) => {
            this.swal.callToast(res.value!, 'info');
            this.loadInvoices();
          }
        );
      }
    );
  }

  addDetail() {
    const detail: InvoiceDetailModel = {
      price: this.createModel.price,
      quantity: this.createModel.quantity,
      productId: this.createModel.productId,
      id: "",
      invoiceId: "",
      product: this.products.find(p => p.id == this.createModel.productId) ?? new ProductModel()
    }

    this.createModel.details.push(detail);

    this.createModel.productId = "";
    this.createModel.quantity = 0;
    this.createModel.price = 0;
  }

  addDetailForUpdate() {
    const detail: InvoiceDetailModel = {
      price: this.updateModel.price,
      quantity: this.updateModel.quantity,
      productId: this.updateModel.productId,
      id: "",
      invoiceId: "",
      product: this.products.find(p => p.id == this.updateModel.productId) ?? new ProductModel()
    }

    this.updateModel.details.push(detail);

    this.updateModel.productId = "";
    this.updateModel.quantity = 0;
    this.updateModel.price = 0;
  }

  removeDetailItem(index: number) {
    this.createModel.details.splice(index, 1);
  }

  removeDetailItemForUpdate(index: number) {
    this.updateModel.details.splice(index, 1);
  }
}
