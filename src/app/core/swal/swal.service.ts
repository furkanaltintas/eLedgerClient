import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  callToast(title:string, icon: SweetAlertIcon = "success") {
    Swal.fire({
      title: title,
      timer: 3000,
      icon: icon,
      showCancelButton: false,
      showCloseButton: false,
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false
    });
  }

  deleteToast(title:string, text: string, callBack: () => void, confirmButtonText: string = "Delete") {
    Swal.fire({
      title: title,
      text: text,
      icon: "question",
      showConfirmButton: true,
      confirmButtonText : confirmButtonText,
      showCancelButton: true,
      cancelButtonText: "Cancel"
    }).then(res => {
      if(res.isConfirmed) {
        callBack();
      }
    });
  }
}


export type SweetAlertIcon = "success" | "error" | "warning" | "info" | "question";
