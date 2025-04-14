import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { SIGNALR_BASE_URL } from '../constants/url-constants';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  hub: signalR.HubConnection | undefined;
  constructor() { }

  connect(callBack: () => void) {
    this.hub = new signalR.HubConnectionBuilder()
    .withUrl(`${SIGNALR_BASE_URL}/report-hub`)
    .build();

    this.hub
    .start()
    .then(() => {
      console.log("Report hub ile bağlantı başlatıldı");
      callBack();
    })
  }
}
