import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from './auth.model';
import { SwalService } from '../swal/swal.service';
import { ResultModel } from '../models/result.model';
import { ErrorService } from '../error/error.service';
import { UserModel } from '../../models/users/user.model';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { API_BASE_URL, AUTH_ENDPOINT, TOKEN_KEY } from '../../constants/url-constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: UserModel = new UserModel();

  constructor(
    private http: HttpClient,
    private swal: SwalService,
    private error: ErrorService,
    private router: Router
  ) {}

  login(
    body: LoginRequest,
    callBack: (res: ResultModel<LoginResponse>) => void,
    errCallBack?: (err: HttpErrorResponse) => void
  ): void {

    this.http.post<ResultModel<LoginResponse>>(AUTH_ENDPOINT, body, {}).subscribe({
      next: (res) => {
        if(res.value && res.value.token) {
          localStorage.setItem(TOKEN_KEY, res.value!.token);
          this.swal.callToast("Giriş işlemi başarılı", "success");
          callBack(res);
        } else {
          this.swal.callToast("Token alınamadı", "error");
          if (errCallBack) {
            errCallBack({ status: 500, message: "Token alınamadı" } as HttpErrorResponse);
          }
        }
      },
      error: (err: HttpErrorResponse) => {
        // Hata durumunda errorHandler'ı çalıştır
        this.error.errorHandler(err);

        // Eğer errCallBack fonksiyonu varsa, onu çağır
        if (errCallBack) {
          errCallBack(err);
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    let token = this.getToken();
    if(token === "") {
      this.router.navigateByUrl("/login");
      return false;
    }

    const decode: JwtPayload | any = jwtDecode(token!);
    const exp = decode.exp;
    const now = new Date().getTime() / 1000;

    if(now > exp) {
      this.router.navigateByUrl("/login");
      return false;
    }

    this.user.id = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    this.user.fullName = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    this.user.email = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    this.user.companies = JSON.parse(decode["Companies"]);
    this.user.userName = decode["UserName"];
    this.user.companyId = decode["CompanyId"]; // 2. Aşamada atanıyor
    console.log(this.user);

    if(this.user.companyId === "00000000-0000-0000-0000-000000000000") {
      return false;
    } else {
      return true;
    }
  }
}
