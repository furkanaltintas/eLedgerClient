import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BankDetailPipe } from '../../../../pipes/bank-detail.pipe';
import { SectionDescriptionComponent } from '../../../../layout/section-description/section-description.component';
import { BankDetailModel } from '../../../../models/bank-detail/bank-detail.model';
import { BankModel } from '../../../../models/banks/bank.model';
import { HttpService } from '../../../../core/api/http.service';
import { SwalService } from '../../../../core/swal/swal.service';
import { ActivatedRoute } from '@angular/router';
import { BANK_DETAILS_ENDPOINT, BANKS_ENDPOINT } from '../../../../constants/url-constants';

@Component({
  selector: 'app-bank-details',
  imports: [CommonModule, FormsModule, BankDetailPipe, SectionDescriptionComponent],
  templateUrl: './bank-details.component.html',
  styleUrl: './bank-details.component.css',
  providers: [DatePipe]
})
export class BankDetailsComponent {
  createModel: BankDetailModel = new BankDetailModel();
  updateModel: BankDetailModel = new BankDetailModel();
  bank: BankModel = new BankModel();
  banks: BankModel[] = [];
  bankId: string = "";
  startDate: string = "";
  endDate: string = "";
  search: string = '';

  @ViewChild('createModalCloseBtn') createModalCloseBtn: | ElementRef<HTMLButtonElement> | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn: | ElementRef<HTMLButtonElement>| undefined;

  constructor(
    private http: HttpService,
    private swal: SwalService,
    private activated: ActivatedRoute,
    private date: DatePipe
  ) {
    this.activated.params.subscribe(res => {
      this.bankId = res["id"];
    });

    this.startDate = this.date.transform(new Date(), 'yyyy-MM-dd') ?? "";
    this.endDate = this.date.transform(new Date(), 'yyyy-MM-dd') ?? "";
    this.createModel.date = this.date.transform(new Date(), 'yyyy-MM-dd') ?? "";
    this.createModel.bankId = this.bankId;
    this.loadBank();
    this.loadBanks();
  }

  loadBank() {
    this.http.get<BankModel>(BANK_DETAILS_ENDPOINT, (res) => {
      this.bank = res.value!;
    },
    {
      bankId: this.bankId,
      startDate: this.startDate,
      endDate: this.endDate});
  }

  loadBanks() {
    this.http.get<BankModel[]>(BANKS_ENDPOINT, (res) => {
      this.banks = res.value!.filter(c => c.id != this.bankId);
    });
  }

  get(model: BankDetailModel) {
    this.updateModel = { ...model };
    this.updateModel.amount = this.updateModel.depositAmount + this.updateModel.withdrawalAmount;
    this.updateModel.type = this.updateModel.depositAmount > 0 ? 0 : 1;
  }

  create(form: NgForm) {
    if (form.valid) {
      this.createModel.amount = +this.createModel.amount;
      this.createModel.oppositeAmount = +this.createModel.oppositeAmount;

      if(this.createModel.recordType === 0) this.createModel.oppositeBankId = null;
      if(this.createModel.oppositeAmount === 0) this.createModel.oppositeAmount = this.createModel.amount;

      this.http.post<string>(
        BANK_DETAILS_ENDPOINT,
        this.createModel,
        (res) => {
          this.swal.callToast(res.value!);
          this.createModel = new BankDetailModel();
          this.createModel.date = this.date.transform(new Date(), 'yyyy-MM-dd') ?? "";
          this.createModel.bankId = this.bankId;
          this.createModalCloseBtn?.nativeElement.click();
          this.loadBank();
        }
      );
    }
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.put<string>(
        BANK_DETAILS_ENDPOINT,
        this.updateModel,
        (res) => {
          this.swal.callToast(res.value!);
          this.updateModel = new BankDetailModel();
          this.updateModalCloseBtn?.nativeElement.click();
          this.loadBank();
        }
      );
    }
  }

  delete(model: BankDetailModel) {
    this.swal.deleteToast(
      "Kasa hareketini sil?",
      `${model.date} tarihteki ${model.description} açıklamalı hareketi silmek istiyor musunuz ?`,
      () => {
        this.http.delete<string>(
          BANK_DETAILS_ENDPOINT, { id: model.id }, (res) => {
            this.swal.callToast(res.value!, 'info');
            this.loadBank();
          });
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

  setOppositeBank() {
    debugger;
    const cash = this.banks.find(c => c.id == this.createModel.oppositeBankId);
    if(cash) {
      this.createModel.oppositeBank = cash;
    }
  }
}
