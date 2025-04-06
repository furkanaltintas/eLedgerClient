import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from './auth.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SwalService } from '../swal/swal.service';
import { api } from '../../constants/url-constants';
import { ResultModel } from '../../models/result.model';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'access_token';

  constructor(
    private http: HttpClient,
    private swal: SwalService,
    private error: ErrorService
  ) {}

  login(
    body: LoginRequest,
    callBack: (res: ResultModel<LoginResponse>) => void,
    errCallBack?: (err: HttpErrorResponse) => void
  ): void {
    const apiUrl = `${api}/Auth`;

    this.http.post<ResultModel<LoginResponse>>(apiUrl, body, {}).subscribe({
      next: (res) => {
        if(res.value && res.value.token) {
          localStorage.setItem(this.tokenKey, res.value!.token);
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
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
