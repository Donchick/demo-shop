import {Injectable, ComponentFactoryResolver, ReflectiveInjector, EventEmitter} from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable()
export class ModalService {
  private _openModelSubject: Subject<any> = new Subject<any>();
  private _closeModalSubject: Subject<any> = new Subject<any>();
  public openModalObserver: Observable<any> = this._openModelSubject.asObservable();
  public closeModalObserver: Observable<any> = this._closeModalSubject.asObservable();

  constructor() { }

  open (modal, model) {
    this._openModelSubject.next({modal, model});
  }

  closeModal () {
    this._closeModalSubject.next();
  }
}
