import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      }
    });
  }

  success(message: string) {
    alertify.success(message);
    return true;
  }

  error(message: string) {
    alertify.error(message);
    return true;
  }

  warning(message: string) {
    alertify.warning(message);
    return true;
  }

  message(message: string) {
    alertify.message(message);
    return true;
  }
}
