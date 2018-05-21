import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {ActionResultPopupService} from "./services/action-result-popup/action-result-popup.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/styles/components-styles/buttons-styles.css',
    '../assets/styles/reset_css.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  actionResultMsg: string = null;

  constructor(private _actionResultPopupService: ActionResultPopupService) { }

  ngOnInit () {
    this._actionResultPopupService.popupMsg.subscribe(msg => this.actionResultMsg = msg);
  }
}
