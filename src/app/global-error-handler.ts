import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { ModalService } from './services/modal/modal.service';
import { ActionResultModalComponent } from './infrastructure/action-result-modal/action-result-modal.component';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private _injector: Injector) { 

  }
  handleError(error) {
     const modalService = this._injector.get(ModalService);
     modalService.open(ActionResultModalComponent, { message: 'Something happened, please reload the page and try your action one more time!' });
     throw error;
  }
  
}