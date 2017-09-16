import {Injectable, ComponentFactoryResolver, ReflectiveInjector, EventEmitter} from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable()
export class ModalService {
  private _openModelSubject: Subject<any> = new Subject<any>();
  public openModalObserver: Observable<any> = this._openModelSubject.asObservable();

  constructor() { }

  open (modal, model) {
    this._openModelSubject.next({modal, model});
    /*
    AppComponent.openModal(componentClass, model);
    let factory = this._componentFactoryResolver.resolveComponentFactory(componentClass);
    let injector = ReflectiveInjector.resolveAndCreate([]);
    let component = factory.create(injector);
    */
  }
}
