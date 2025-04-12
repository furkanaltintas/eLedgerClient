import { Component } from '@angular/core';
import { CustomerDetailPipe } from '../../../../pipes/customer-detail.pipe';
import { FormsModule } from '@angular/forms';
import { SectionDescriptionComponent } from '../../../../layout/section-description/section-description.component';
import { CommonModule } from '@angular/common';
import { CustomerModel } from '../../../../models/customers/customer.model';
import { HttpService } from '../../../../core/api/http.service';
import { ActivatedRoute } from '@angular/router';
import { CUSTOMER_DETAILS_ENDPOINT } from '../../../../constants/url-constants';

@Component({
  selector: 'app-customer-details',
  imports: [CommonModule, FormsModule, CustomerDetailPipe, SectionDescriptionComponent],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent {
  customer: CustomerModel = new CustomerModel();
  customerId: string = "";
  search: string = '';

  constructor(
    private http: HttpService,
    private activated: ActivatedRoute,
  ) {
    this.activated.params.subscribe(res => {
      this.customerId = res["id"];
    });

    this.getAll();
  }

  getAll() {
    this.http.get<CustomerModel>(CUSTOMER_DETAILS_ENDPOINT, (res) => {
      this.customer = res.value!;
    }, { customerId: this.customerId});
  }
}
