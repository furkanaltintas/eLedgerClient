import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '../models/result.model';
import { ErrorService } from '../error/error.service';
import { API_BASE_URL, TOKEN_KEY } from '../../constants/url-constants';
import { UNEXPECTED_ERROR } from '../../constants/message-constants';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  token: string = "";

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) {
    if(localStorage.getItem(TOKEN_KEY)) {
      this.token = localStorage.getItem(TOKEN_KEY) ?? "";
    }
  }

  post<T>(
    apiUrl: string,
    body: any,
    callBack: (res: ResultModel<T>) => void,
    errCallBack?: (err: HttpErrorResponse) => void
  ): void {
    const url = `${API_BASE_URL}${apiUrl}`;
    this.http.post<ResultModel<T>>(url, body, {
      headers: {
        "Authorization": "Bearer " + this.token
      }
    }).subscribe({
      next: (res => {
          callBack(res);
      }),
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
        this.handleError(err, errCallBack);
      },
    });
  }

  delete<T>(
    apiUrl: string,
    body: any,
    callBack: (res: ResultModel<T>) => void,
    errCallBack?: (err: HttpErrorResponse) => void
  ): void {
    const url = `${API_BASE_URL}${apiUrl}`;
    this.http.delete<ResultModel<T>>(url, {body: body, headers: {
      "Authorization": "Bearer " + this.token
    }}).subscribe({
      next: (res) => {
        callBack(res);
    },
      error: (err: HttpErrorResponse) => {
        this.handleError(err, errCallBack);
      },
    });
  }

  put<T>(
    apiUrl: string,
    body: any,
    callBack: (res: ResultModel<T>) => void,
    errCallBack?: (err: HttpErrorResponse) => void
  ): void {
    const url = `${API_BASE_URL}${apiUrl}`;
    this.http.put<ResultModel<T>>(url, body, {
      headers: {
        "Authorization": "Bearer " + this.token
      }
    }).subscribe({
      next: (res) => {
        callBack(res);
    },
      error: (err: HttpErrorResponse) => {
        this.handleError(err, errCallBack);
      },
    });
  }


  get<T>(
    apiUrl: string,
    callBack: (res: ResultModel<T>) => void,
    params?: any,
    errCallBack?: (err: HttpErrorResponse) => void
  ): void {
    const url = `${API_BASE_URL}${apiUrl}`;
    this.http.get<ResultModel<T>>(url, { params,
      headers: {
        "Authorization": "Bearer " + this.token
      }
     }).subscribe({
      next: (res) => {
        callBack(res);
    },
      error: (err: HttpErrorResponse) => {
        this.handleError(err, errCallBack);
      },
    });
  }

  handleError(
    err: HttpErrorResponse,
    errCallBack?: (err: HttpErrorResponse) => void
  ): void {
    this.error.errorHandler(err);

    console.error('API error:', err);
    if (errCallBack !== undefined) {
      errCallBack(err);
    } else {
      console.error(UNEXPECTED_ERROR);
    }
  }
}
