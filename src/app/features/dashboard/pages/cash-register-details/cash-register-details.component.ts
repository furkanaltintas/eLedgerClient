import { Component, ElementRef, ViewChild } from '@angular/core';
import { CashRegisterDetailPipe } from '../../../../pipes/cash-register-detail.pipe';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CashRegisterModel } from '../../../../models/cash-registers/cash-register.model';
import { HttpService } from '../../../../core/api/http.service';
import { SwalService } from '../../../../core/swal/swal.service';
import { BANKS_ENDPOINT, CASH_REGISTER_DETAILS_ENDPOINT, CASH_REGISTERS_ENDPOINT, CUSTOMERS_ENDPOINT } from '../../../../constants/url-constants';
import { CashRegisterDetailModel } from '../../../../models/cash-register-details/cash-register-detail.model';
import { ActivatedRoute } from '@angular/router';
import { BankModel } from '../../../../models/banks/bank.model';
import { CustomerModel } from '../../../../models/customers/customer.model';
import { SharedModule } from '../../../../core/modules/shared.module';

@Component({
  selector: 'app-cash-register-details',
  imports: [SharedModule, CashRegisterDetailPipe],
  templateUrl: './cash-register-details.component.html',
  styleUrl: './cash-register-details.component.css',
  providers:  [DatePipe]
})
export class CashRegisterDetailsComponent {
  createModel: CashRegisterDetailModel = new CashRegisterDetailModel();
  updateModel: CashRegisterDetailModel = new CashRegisterDetailModel();
  cashRegister: CashRegisterModel = new CashRegisterModel();
  cashRegisters: CashRegisterModel[] = [];
  banks: BankModel[] = [];
  customers: CustomerModel[] = [];
  cashRegisterId: string = "";
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
      this.cashRegisterId = res["id"];
      this.startDate = this.date.transform(new Date(), 'yyyy-MM-dd') ?? "";
      this.endDate = this.date.transform(new Date(), 'yyyy-MM-dd') ?? "";
      this.createModel.date = this.date.transform(new Date(), 'yyyy-MM-dd') ?? "";
      this.createModel.cashRegisterId = this.cashRegisterId;

      this.loadCashRegister();
      this.loadCashRegisters();
      this.loadBanks();
      this.loadCustomers();
    });
  }

  loadCashRegister() {
    this.http.get<CashRegisterModel>(CASH_REGISTER_DETAILS_ENDPOINT, (res) => {
      this.cashRegister = res.value!;
    },
    {
      cashRegisterId: this.cashRegisterId,
      startDate: this.startDate,
      endDate: this.endDate});
  }

  loadCashRegisters() {
    this.http.get<CashRegisterModel[]>(CASH_REGISTERS_ENDPOINT, (res) => {
      this.cashRegisters = res.value!.filter(c => c.id != this.cashRegisterId);
    });
  }

  loadBanks() {
    this.http.get<BankModel[]>(BANKS_ENDPOINT, (res) => {
      this.banks = res.value!;
    });
  }

  loadCustomers() {
     this.http.get<CustomerModel[]>(CUSTOMERS_ENDPOINT, (res) => {
       this.customers = res.value!;
     });
  }

  get(model: CashRegisterDetailModel) {
    this.updateModel = { ...model };
    this.updateModel.amount = this.updateModel.depositAmount + this.updateModel.withdrawalAmount;
    this.updateModel.type = this.updateModel.depositAmount > 0 ? 0 : 1;
  }

  create(form: NgForm) {
    if (form.valid) {
      this.createModel.amount = +this.createModel.amount;
      this.createModel.oppositeAmount = +this.createModel.oppositeAmount;

      if(this.createModel.recordType == 0) {
        this.createModel.oppositeBankId = null;
        this.createModel.oppositeCashRegisterId = null;
        this.createModel.oppositeCustomerId = null;
      } else if (this.createModel.recordType == 1) {
        this.createModel.oppositeBankId = null;
        this.createModel.oppositeCustomerId = null;
      } else if (this.createModel.recordType == 2) {
        this.createModel.oppositeCashRegisterId = null;
        this.createModel.oppositeCustomerId = null;
      } else if (this.createModel.recordType == 3) {
        this.createModel.oppositeCashRegisterId  = null;
        this.createModel.oppositeBankId = null;
      }

      if(this.createModel.oppositeAmount === 0) this.createModel.oppositeAmount = this.createModel.amount;

      this.http.post<string>(
        CASH_REGISTER_DETAILS_ENDPOINT,
        this.createModel,
        (res) => {
          this.swal.callToast(res.value!);
          this.createModel = new CashRegisterDetailModel();
          this.createModel.date = this.date.transform(new Date(), 'yyyy-MM-dd') ?? "";
          this.createModel.cashRegisterId = this.cashRegisterId;
          this.createModalCloseBtn?.nativeElement.click();
          this.loadCashRegister();
        }
      );
    }
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.put<string>(
        CASH_REGISTER_DETAILS_ENDPOINT,
        this.updateModel,
        (res) => {
          this.swal.callToast(res.value!);
          this.updateModel = new CashRegisterDetailModel();
          this.updateModalCloseBtn?.nativeElement.click();
          this.loadCashRegister();
        }
      );
    }
  }

  delete(model: CashRegisterDetailModel) {
    this.swal.deleteToast(
      "Kasa hareketini sil?",
      `${model.date} tarihteki ${model.description} açıklamalı hareketi silmek istiyor musunuz ?`,
      () => {
        this.http.delete<string>(
          CASH_REGISTER_DETAILS_ENDPOINT, { id: model.id }, (res) => {
            this.swal.callToast(res.value!, 'info');
            this.loadCashRegister();
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

  setOppositeCashRegister() {
    const cash = this.cashRegisters.find(c => c.id === this.createModel.oppositeCashRegisterId);
    if(cash) {
      this.createModel.oppositeCashRegister = cash;
    }
  }

  setOppositeBank() {
    const bank = this.banks.find(c => c.id === this.createModel.oppositeBankId);
    if(bank) {
      this.createModel.oppositeBank = bank;
    }
  }
}
