import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { ProductProfitabilityModel } from '../../../../models/product-profitability-reports/-product-profitability.model';
import { HttpService } from '../../../../core/api/http.service';
import { PRODUCT_PROFITABILITY_REPORTS_ENDPOINT } from '../../../../constants/url-constants';

@Component({
  selector: 'app-product-profitability-reports',
  imports: [SharedModule],
  templateUrl: './product-profitability-reports.component.html',
  styleUrl: './product-profitability-reports.component.css'
})
export class ProductProfitabilityReportsComponent implements OnInit {
  data: ProductProfitabilityModel[] = [];

  constructor(
    private http: HttpService
  ) {}


  ngOnInit(): void {
    this.get();
  }

  get() {
    this.http.get<ProductProfitabilityModel[]>(PRODUCT_PROFITABILITY_REPORTS_ENDPOINT,(res) => {
      this.data = res.value!  ;
    })
  }
}
