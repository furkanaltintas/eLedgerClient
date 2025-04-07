import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwalService } from '../../swal/swal.service';
import { ErrorMessages } from '../enums/error-messages';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private swal: SwalService
  ) { }

  errorHandler(err: HttpErrorResponse) {
    let message = this.getErrorMessage(err);

    this.logErrors(err);
    this.swal.callToast(message, "error");
  }

  private getErrorMessage(err: HttpErrorResponse): string {
    switch (err.status) {
      case 0:
        return ErrorMessages.API_NOT_AVAILABLE;
      case 401:
        return ErrorMessages.UNAUTHORIZED;
      case 404:
        return ErrorMessages.API_NOT_FOUND;
      case 500:
        return this.formatServerErrors(err.error.errorMessages);
      default:
        return ErrorMessages.GENERIC_ERROR;
    }
  }

  private formatServerErrors(errorMessages: string[]): string {
    return errorMessages.join('\n');
  }

  private logErrors(err: HttpErrorResponse): void {
    console.error(err); // Hata loglama işlemi daha yapılmadı
  }
}
