import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  callToast(title:string, icon: SweetAlertIcon = "success", position: SweetAlertPosition = "bottom-right", timer: number = 3000) {
    Swal.fire({
      title: title,
      icon: icon,
      toast: true,
      position: position,
      timer: timer,
      showCancelButton: false,
      showCloseButton: false,
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
    }).catch((error) => {
      console.log(error);
    });
  }
}



// export type SweetAlertIcon = "success" | "error" | "warning" | "info" | "question";

// export type SweetAlertPosition =
// | 'top'
// | 'top-start'
// | 'top-end'
// | 'top-left'
// | 'top-right'
// | 'center'
// | 'center-start'
// | 'center-end'
// | 'center-left'
// | 'center-right'
// | 'bottom'
// | 'bottom-start'
// | 'bottom-end'
// | 'bottom-left'
// | 'bottom-right';
