import { Component, ElementRef, ViewChild } from '@angular/core';
import { BankPipe } from '../../../../pipes/bank.pipe';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SectionDescriptionComponent } from '../../../../layout/section-description/section-description.component';
import { BankModel } from '../../../../models/banks/bank.model';
import { CurrencyTypes } from '../../../../models/cash-registers/currency-type.model';
import { HttpService } from '../../../../core/api/http.service';
import { SwalService } from '../../../../core/swal/swal.service';
import { BANKS_ENDPOINT } from '../../../../constants/url-constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banks',
  imports: [CommonModule, FormsModule,RouterLink, BankPipe, SectionDescriptionComponent],
  templateUrl: './banks.component.html',
  styleUrl: './banks.component.css'
})
export class BanksComponent {
  banks: BankModel[] = [];
  createModel: BankModel = new BankModel();
  updateModel: BankModel = new BankModel();
  currencyTypes = CurrencyTypes;
  search: string = '';

  @ViewChild('createModalCloseBtn') createModalCloseBtn:| ElementRef<HTMLButtonElement>| undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:| ElementRef<HTMLButtonElement>| undefined;

  constructor(
    private http: HttpService,
    private swal: SwalService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  private loadCompanies() {
    this.http.get<BankModel[]>(BANKS_ENDPOINT, (res) => {
      this.banks = res.value!;
    });
  }

  get(model: BankModel) {
    debugger;
    this.updateModel = { ...model };
    this.updateModel.currencyTypeValue = this.updateModel.currencyType.value;
  }

  create(form: NgForm) {
    debugger;
    if (form.valid) {
      this.http.post<string>(
        BANKS_ENDPOINT,
        this.createModel,
        (res) => {
          this.swal.callToast(res.value!);
          this.createModel = new BankModel();
          this.createModalCloseBtn?.nativeElement.click();
          this.loadCompanies();
        }
      );
    }
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.put<string>(
        BANKS_ENDPOINT,
        this.updateModel,
        (res) => {
          this.swal.callToast(res.value!);
          this.updateModel = new BankModel();
          this.updateModalCloseBtn?.nativeElement.click();
          this.loadCompanies();
        }
      );
    }
  }

  delete(model: BankModel) {
    this.swal.deleteToast(
      "Bankayı Sil?",
      `${model.name} bankasını silmek istiyor musunuz ?`,
      () => {
        this.http.delete<string>(
          BANKS_ENDPOINT,
          { id: model.id },
          (res) => {
            this.swal.callToast(res.value!, 'info');
            this.loadCompanies();
          }
        );
      }
    );
  }

  changeCurrencyNameToSymbol(name: string) {
    switch (name) {
      case 'TL':
        return '₺';
      case 'USD':
        return '$';
      case 'EURO':
        return '€';
      default:
        return '';
    }
  }
}
