import { Component } from '@angular/core';
import { HttpService } from '../../../../core/api/http.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { LoginResponse } from '../../../../core/auth/auth.model';
import { Router } from '@angular/router';
import { AUTH_LOGIN_BY_COMPANY, COMPANIES_USER_COMPANIES, TOKEN_KEY } from '../../../../constants/url-constants';
import { SwalService } from '../../../../core/swal/swal.service';
import { ChooseCompanyModel } from '../../../../models/companies/choose-company.model';
import { LoginByCompanyModel } from '../../../../models/companies/login-by-company.model';
import { LOGIN_SUCCESSFUL } from '../../../../constants/message-constants';

@Component({
  selector: 'app-choose-company',
  imports: [CommonModule],
  templateUrl: './choose-company.component.html',
  styleUrl: './choose-company.component.css'
})
export class ChooseCompanyComponent {
  companies: ChooseCompanyModel[] = [];

  constructor(
    private http: HttpService,
    private auth: AuthService,
    private router: Router,
    private swal : SwalService
  ) {
    this.auth.isAuthenticated();
    this.userCompanies();
  }

  userCompanies() { // Kullanıcıya ait şirketler
    this.http.post<ChooseCompanyModel[]>(COMPANIES_USER_COMPANIES,{userId: this.auth.user.id}, (res) => {
      this.companies = res.value!;
    });
  }

  // Şirkete göre giriş yapma
  userCompany(companyId: string) {
    let loginCompany = new LoginByCompanyModel(this.auth.user.id, companyId);
    localStorage.removeItem(TOKEN_KEY);

    this.http.post<LoginResponse>(AUTH_LOGIN_BY_COMPANY, loginCompany, (res) => {
      localStorage.setItem(TOKEN_KEY, res.value!.token);
      this.swal.callToast(LOGIN_SUCCESSFUL, "success");
      this.router.navigate(['/']);
    }, () => {
      this.router.navigate(['/choose-company']);
    });
  }
}
