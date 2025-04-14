import { Component, ElementRef, ViewChild } from '@angular/core';
import { CashRegisterPipe } from '../../../../pipes/cash-register.pipe';
import { CashRegisterModel } from '../../../../models/cash-registers/cash-register.model';
import { HttpService } from '../../../../core/api/http.service';
import { SwalService } from '../../../../core/swal/swal.service';
import { CASH_REGISTERS_ENDPOINT } from '../../../../constants/url-constants';
import {
  CASH_REGISTER_DELETE_CONFIRMATION_MESSAGE,
  CASH_REGISTER_DELETE_CONFIRMATION_TITLE,
} from '../../../../constants/message-constants';
import { CurrencyTypes } from '../../../../models/cash-registers/currency-type.model';
import { SharedModule } from '../../../../core/modules/shared.module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cash-registers',
  imports: [SharedModule, CashRegisterPipe],
  templateUrl: './cash-registers.component.html',
  styleUrl: './cash-registers.component.css',
})
export class CashRegistersComponent {
  cashRegisters: CashRegisterModel[] = [];
  createModel: CashRegisterModel = new CashRegisterModel();
  updateModel: CashRegisterModel = new CashRegisterModel();
  currencyTypes = CurrencyTypes;
  search: string = '';
  p: number = 1;

  @ViewChild('createModalCloseBtn') createModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;

  constructor(private http: HttpService, private swal: SwalService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  private loadCompanies() {
    this.http.get<CashRegisterModel[]>(CASH_REGISTERS_ENDPOINT, (res) => {
      this.cashRegisters = res.value!;
    });
  }

  get(model: CashRegisterModel) {
    debugger;
    this.updateModel = { ...model };
    this.updateModel.currencyTypeValue = this.updateModel.currencyType.value;
  }

  create(form: NgForm) {
    debugger;
    if (form.valid) {
      this.http.post<string>(
        CASH_REGISTERS_ENDPOINT,
        this.createModel,
        (res) => {
          this.swal.callToast(res.value!);
          this.createModel = new CashRegisterModel();
          this.createModalCloseBtn?.nativeElement.click();
          this.loadCompanies();
        }
      );
    }
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.put<string>(
        CASH_REGISTERS_ENDPOINT,
        this.updateModel,
        (res) => {
          this.swal.callToast(res.value!);
          this.updateModel = new CashRegisterModel();
          this.updateModalCloseBtn?.nativeElement.click();
          this.loadCompanies();
        }
      );
    }
  }

  delete(model: CashRegisterModel) {
    this.swal.deleteToast(
      CASH_REGISTER_DELETE_CONFIRMATION_TITLE,
      CASH_REGISTER_DELETE_CONFIRMATION_MESSAGE(model.name),
      () => {
        this.http.delete<string>(
          CASH_REGISTERS_ENDPOINT,
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
