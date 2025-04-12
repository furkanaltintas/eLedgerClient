import { Component } from '@angular/core';
import { CustomerDetailPipe } from '../../../../pipes/customer-detail.pipe';
import { CustomerModel } from '../../../../models/customers/customer.model';
import { HttpService } from '../../../../core/api/http.service';
import { ActivatedRoute } from '@angular/router';
import { CUSTOMER_DETAILS_ENDPOINT } from '../../../../constants/url-constants';
import { SharedModule } from '../../../../core/modules/shared/shared.module';

@Component({
  selector: 'app-customer-details',
  imports: [SharedModule, CustomerDetailPipe],
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
