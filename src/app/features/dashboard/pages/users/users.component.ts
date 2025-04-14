import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserPipe } from '../../../../pipes/user.pipe';
import { UserModel } from '../../../../models/users/user.model';
import { HttpService } from '../../../../core/api/http.service';
import { SwalService } from '../../../../core/swal/swal.service';
import { CompanyModel } from '../../../../models/companies/company.model';
import { CompanyUserModel } from '../../../../models/companies/company-user.model';
import {
  AUTH_CHANGE_COMPANY,
  COMPANIES_ENDPOINT,
  TOKEN_KEY,
  USERS_ENDPOINT,
} from '../../../../constants/url-constants';
import { AdminStatusPipe } from '../../../../pipes/admin-status.pipe';
import { AdminStatusClassPipe } from '../../../../pipes/admin-status-class.pipe';
import { LoginResponse } from '../../../../core/auth/models/auth.model';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { SharedModule } from '../../../../core/modules/shared.module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModule, UserPipe, AdminStatusPipe, AdminStatusClassPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  createModel: UserModel = new UserModel();
  updateModel: UserModel = new UserModel();
  companies: CompanyModel[] = [];
  users: UserModel[] = [];
  search: string = '';
  p: number = 1;

  @ViewChild('createModalCloseBtn') createModalCloseBtn: | ElementRef<HTMLButtonElement> | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn: | ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private http: HttpService,
    private swal: SwalService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadCompanies();
  }

  private loadUsers() {
    this.http.get<UserModel[]>(USERS_ENDPOINT, (res) => {
      this.users = res.value!;
    });
  }

  private loadCompanies() {
    this.http.get<CompanyModel[]>(COMPANIES_ENDPOINT, (res) => {
      this.companies = res.value!;
    });
  }

  get(model: UserModel) {
    this.updateModel = { ...model };
    this.updateModel.companyIds = this.updateModel.companyUsers.map(
      (value) => value.companyId
    );
  }

  create(form: NgForm) {
    if (!form.valid) return;

    this.http.post<string>(USERS_ENDPOINT, this.createModel, (res) => {
      const message = res.value!;
      if (!res.isSuccess) return;

      this.swal.callToast(message);
      this.createModel = new UserModel();
      this.createModalCloseBtn?.nativeElement.click();

      debugger;
      this.refreshCompanies();
    });
  }

  update(form: NgForm) {
    if (form.valid) {
      if (this.updateModel.password === '') this.updateModel.password = null;

      this.http.put<string>(USERS_ENDPOINT, this.updateModel, (res) => {
        this.swal.callToast(res.value!);
        this.updateModel = new UserModel();
        this.updateModalCloseBtn?.nativeElement.click();
        this.refreshCompanies();
      });
    }
  }

  delete(model: UserModel) {
    this.swal.deleteToast(
      'Kullanıcıyı Sil ?',
      `${model.fullName} kullanıcısını silmek istiyor musunuz ?`,
      () => {
        this.http.delete<string>(USERS_ENDPOINT, { id: model.id }, (res) => {
          this.swal.callToast(res.value!, 'info');
          this.loadUsers();
        });
      }
    );
  }

  showServers(companyUsers: CompanyUserModel[]) {
    const serverNames = companyUsers
      .map((companyUser) => companyUser.company.name)
      .join(', ');
    this.swal.callToast(`Serverlar:\n ${serverNames}`, 'info');
  }

  refreshCompanies() {
    this.http.post<LoginResponse>(
      AUTH_CHANGE_COMPANY,
      { companyId: this.auth.user.companyId },
      (res) => {
        setTimeout(() => {
          const token = res.value!.token;
          localStorage.setItem(TOKEN_KEY, token);
          this.loadUsers();
          document.location.reload(); // Sayfayı otomatik olarak refresh işlemi yapıyor.
        }, 1000);
      },
      () => {
        this.loadUsers();
      }
    );
  }
}
