import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomerPipe } from '../../../../pipes/customer.pipe';
import { SectionDescriptionComponent } from '../../../../layout/section-description/section-description.component';
import { CustomerModel, CustomerTypes } from '../../../../models/customers/customer.model';
import { HttpService } from '../../../../core/api/http.service';
import { SwalService } from '../../../../core/swal/swal.service';
import { CUSTOMERS_ENDPOINT } from '../../../../constants/url-constants';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, FormsModule,RouterLink, CustomerPipe, SectionDescriptionComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  customers: CustomerModel[] = [];
  customerTypes = CustomerTypes;
  createModel: CustomerModel = new CustomerModel();
  updateModel: CustomerModel = new CustomerModel();
  search: string = '';

  @ViewChild('createModalCloseBtn') createModalCloseBtn:| ElementRef<HTMLButtonElement>| undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:| ElementRef<HTMLButtonElement>| undefined;

  constructor(
    private http: HttpService,
    private swal: SwalService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  private loadCustomers() {
    this.http.get<CustomerModel[]>(CUSTOMERS_ENDPOINT, (res) => {
      this.customers = res.value!;
    });
  }

  get(model: CustomerModel) {
    debugger;
    this.updateModel = { ...model };
    this.updateModel.typeValue = this.updateModel.type.value;
  }

  create(form: NgForm) {
    debugger;
    if (form.valid) {
      this.http.post<string>(
        CUSTOMERS_ENDPOINT,
        this.createModel,
        (res) => {
          this.swal.callToast(res.value!);
          this.createModel = new CustomerModel();
          this.createModalCloseBtn?.nativeElement.click();
          this.loadCustomers();
        }
      );
    }
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.put<string>(
        CUSTOMERS_ENDPOINT,
        this.updateModel,
        (res) => {
          this.swal.callToast(res.value!);
          this.updateModel = new CustomerModel();
          this.updateModalCloseBtn?.nativeElement.click();
          this.loadCustomers();
        }
      );
    }
  }

  delete(model: CustomerModel) {
    this.swal.deleteToast(
      "Customerayı Sil?",
      `${model.name} carisini silmek istiyor musunuz ?`,
      () => {
        this.http.delete<string>(
          CUSTOMERS_ENDPOINT,
          { id: model.id },
          (res) => {
            this.swal.callToast(res.value!, 'info');
            this.loadCustomers();
          }
        );
      }
    );
  }
}
