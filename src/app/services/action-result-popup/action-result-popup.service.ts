import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable()
export class ActionResultPopupService {
  private _popupMsg: Subject<string> = new Subject<string>();
  private _timer;
  public popupMsg: Observable<string> = this._popupMsg.asObservable();

  constructor() { }

  actionReject (msg: string) {
    this._popupMsg.next(msg || 'We can\'t complete the latest action because services are unavailable.');
    this._timer = setTimeout(() => {
      this.closePopup();
    }, 3000);
  }

  closePopup () {
    this._popupMsg.next(null);
    if (this._timer) {
      clearTimeout(this._timer);
    }
  }
}
