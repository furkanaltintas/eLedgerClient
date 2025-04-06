import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserPipe } from '../../../../pipes/user.pipe';
import { UserModel } from '../../../../models/users/user.model';
import { HttpService } from '../../../../core/api/http.service';
import { SwalService } from '../../../../core/swal/swal.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyModel } from '../../../../models/companies/company.model';
import { CompanyUserModel } from '../../../../models/companies/company-user.model';
import { SectionDescriptionComponent } from "../../../../layout/section-description/section-description.component";
import { COMPANIES_ENDPOINT, USERS_ENDPOINT } from '../../../../constants/url-constants';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, UserPipe, SectionDescriptionComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  createModel:UserModel = new UserModel();
  updateModel:UserModel = new UserModel();
  companies: CompanyModel[] = [];
  users : UserModel[] = [];
  search: string = "";

  @ViewChild("createModalCloseBtn") createModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private http: HttpService,
    private swal: SwalService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadCompanies();
  }

  private loadUsers() {
    this.http.get<UserModel[]>(USERS_ENDPOINT, (res) => {
      this.users = res.value!;
    })
  }

  private loadCompanies() {
    this.http.get<CompanyModel[]>(COMPANIES_ENDPOINT, (res) => {
      this.companies = res.value!;
    })
  }

  get(model: UserModel) {
    this.updateModel = {...model};
    this.updateModel.companyIds = this.updateModel.companyUsers.map(value => value.companyId);
  }

  create(form: NgForm) {
    if(form.valid) {
      this.http.post<string>(USERS_ENDPOINT, this.createModel, (res) => {
        this.swal.callToast(res.value!);
        this.createModel = new UserModel();
        this.createModalCloseBtn?.nativeElement.click();
        this.loadUsers();
      })
    }
  }

  update(form: NgForm) {
    if(form.valid) {
      if(this.updateModel.password === "") this.updateModel.password = null;

      this.http.put<string>(USERS_ENDPOINT, this.updateModel, (res) => {
        this.swal.callToast(res.value!);
        this.updateModel = new UserModel();
        this.updateModalCloseBtn?.nativeElement.click();
        this.loadUsers();
      })
    }
  }

  delete(model: UserModel) {
    this.swal.deleteToast("Kullanıcıyı Sil ?", `${model.fullName} kullanıcısını silmek istiyor musunuz ?`, () => {
      this.http.delete<string>(USERS_ENDPOINT, {id:model.id}, (res) => {
        this.swal.callToast(res.value!, "info");
        this.loadUsers();
      })
    })
  }


  showServers(companyUsers: CompanyUserModel[]) {
    const serverNames = companyUsers.map(companyUser => companyUser.company.name).join(', ');
    this.swal.callToast(`Serverlar:\n ${serverNames}`, "info");
  }
}
