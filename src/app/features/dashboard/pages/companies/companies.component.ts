import { Component, ElementRef, ViewChild } from '@angular/core';
import { CompanyModel } from '../../../../models/companies/company.model';
import { HttpService } from '../../../../core/api/http.service';
import { SwalService } from '../../../../core/swal/swal.service';
import { NgForm } from '@angular/forms';
import { CompanyPipe } from '../../../../pipes/company.pipe';
import {  COMPANIES_ENDPOINT, COMPANIES_MIGRATEALL_ENDPOINT } from '../../../../constants/url-constants';
import { DATABASE_DELETE_CONFIRMATION_MESSAGE, DATABASE_DELETE_CONFIRMATION_TITLE, DATABASE_UPDATE_CONFIRMATION_MESSAGE, DATABASE_UPDATE_CONFIRMATION_TITLE } from '../../../../constants/message-constants';
import { SharedModule } from '../../../../core/modules/shared.module';

@Component({
  selector: 'app-companies',
  imports: [SharedModule, CompanyPipe],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent {
  companies : CompanyModel[] = [];
  createModel:CompanyModel = new CompanyModel();
  updateModel:CompanyModel = new CompanyModel();
  search: string = "";
  p: number = 1;

  @ViewChild("createModalCloseBtn") createModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private http: HttpService,
    private swal: SwalService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  private loadCompanies() {
    this.http.get<CompanyModel[]>(COMPANIES_ENDPOINT, (res) => {
      this.companies = res.value!;
    })
  }

  get(model: CompanyModel) {
    this.updateModel = {...model};
  }

  create(form: NgForm) {
    if(form.valid) {
      this.http.post<string>(COMPANIES_ENDPOINT, this.createModel, (res) => {
        this.swal.callToast(res.value!);
        this.createModel = new CompanyModel();
        this.createModalCloseBtn?.nativeElement.click();
        this.loadCompanies();
      })
    }
  }

  update(form: NgForm) {
    if(form.valid) {
      this.http.put<string>(COMPANIES_ENDPOINT, this.updateModel, (res) => {
        this.swal.callToast(res.value!);
        this.updateModel = new CompanyModel();
        this.updateModalCloseBtn?.nativeElement.click();
        this.loadCompanies();
      })
    }
  }

  delete(model: CompanyModel) {
    this.swal.deleteToast(DATABASE_DELETE_CONFIRMATION_TITLE, DATABASE_DELETE_CONFIRMATION_MESSAGE(model.name), () => {
      this.http.delete<string>(COMPANIES_ENDPOINT, {id:model.id}, (res) => {
        this.swal.callToast(res.value!, "info");
        this.loadCompanies();
      })
    })
  }

  migrateAll() {
    this.swal.deleteToast(DATABASE_UPDATE_CONFIRMATION_TITLE, DATABASE_UPDATE_CONFIRMATION_MESSAGE, () => {
      this.http.post<string>(COMPANIES_MIGRATEALL_ENDPOINT, {}, (res) => {
        this.swal.callToast(res.value!);
      });
    }, "Update");
  }
}
