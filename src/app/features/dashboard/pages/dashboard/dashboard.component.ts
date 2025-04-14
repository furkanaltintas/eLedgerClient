import { AfterViewInit, Component } from '@angular/core';
import { SectionDescriptionComponent } from '../../../../layout/section-description/section-description.component';
import { HttpService } from '../../../../core/api/http.service';
import { PurchaseReportModel } from '../../../../models/purchase-report.model';
import { PURCHASE_REPORTS_ENDPOINT } from '../../../../constants/url-constants';
import { DatePipe } from '@angular/common';
import { SignalrService } from '../../../../services/signalr.service';
declare const Chart: any;

@Component({
  selector: 'app-dashboard',
  imports: [SectionDescriptionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [DatePipe]
})
export class DashboardComponent implements AfterViewInit {

  chart: any;
  response: PurchaseReportModel = new PurchaseReportModel();

  constructor(
    private http: HttpService,
    private date: DatePipe,
    private signalR: SignalrService) {}

  ngAfterViewInit(): void {
    this.showChart();
    this.getPurchaseReports();

    debugger;
    this.signalR.connect(() => {
      this.signalR.hub?.on("PurchaseCreateReports", (res: {date:string, amount:number}) => {

        if(this.response.dates.find(p => p == res.date)) {
          const index = this.response.dates.findIndex(p => p == res.date);
          this.response.amounts[index] += res.amount;
        } else {
          this.response.amounts.push(res.amount);
          this.response.dates.push(res.date);
        }

        this.response.dates = this.response.dates.sort((a, b) => {
          return a.localeCompare(b);
        });

        this.updateChart();
      });

      debugger;
      this.signalR.hub?.on("PurchaseDeleteReport", (res: {date:string, amount: number}) => {
        debugger;
        if(this.response.dates.find(p => p == res.date)) {
          const index = this.response.dates.findIndex(p => p == res.date);
          this.response.amounts[index] -= res.amount;
        } else {
          console.log("silme işlemi başarısız");
        }

        this.response.dates = this.response.dates.sort((a, b) => {
          return a.localeCompare(b);
        });

        this.updateChart();
      });
    });
  }

  getPurchaseReports() {
    this.http.get<PurchaseReportModel>(PURCHASE_REPORTS_ENDPOINT, (res) => {
      debugger;
      this.response = res.value!;
      this.updateChart();
    });
  }

  updateChart() {
    this.chart.data.labels = this.response.dates.map(value => {
      return this.date.transform(value, 'dd.MM.yyyy')
    });
    this.chart.data.datasets[0].data = this.response.amounts;

    this.chart.update();
  }

  showChart() {
    const ctx = document.getElementById('myChart');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: '# Günlük Satışlar',
            data: [],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
