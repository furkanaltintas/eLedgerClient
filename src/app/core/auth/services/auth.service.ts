import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { SwalService } from '../../swal/swal.service';
import { ResultModel } from '../../models/result.model';
import { ErrorService } from '../../error/services/error.service';
import { UserModel } from '../../../models/users/user.model';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { API_BASE_URL, AUTH_ENDPOINT, TOKEN_KEY } from '../../../constants/url-constants';

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
    this.router.navigateByUrl("/login");
  }

  // Kullanıcı oturumu açık mı ?
  isLoggedIn(): boolean {
    const token = this.getToken();
    if(!token) {
      return false; // Token yoksa, kullanıcı giriş yapmamış demektir
    }

    // Token'ın geçerliliğini kontrol et (JWT token'ı ise süresi dolmuş mu kontrolü yapılabilir)
    return !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }

  isTokenExpired(token: string) : boolean {
    const decoded = this.decodeToken(token);
    if(!decoded || !decoded.exp) return true;

    const now = new Date().getTime() / 1000;
    return now > decoded.exp;
  }

  setUserFromToken(decoded: any): void {
    this.user.id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    this.user.fullName = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    this.user.email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    this.user.userName = decoded["UserName"];
    this.user.isAdmin = decoded["IsAdmin"] === "True";
    this.user.companies = JSON.parse(decoded["Companies"]);
    this.user.companyId = decoded["CompanyId"];
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if(!token || this.isTokenExpired(token)) return false;

    const decoded = this.decodeToken(token);
    if(!decoded) return false;

    this.setUserFromToken(decoded);
    return true;
  }

  isTheCompanyOne():boolean {
    return this.user.companies.length == 1;
  }

  isCompanySelected(): boolean {
    return this.user.companyId === "00000000-0000-0000-0000-000000000000"; // Boş ise
  }
}
