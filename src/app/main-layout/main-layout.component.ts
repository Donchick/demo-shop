import {
  Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, Output
} from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('modalDialog', { read: ViewContainerRef }) modalDialogContainer;
  isModalOpened: boolean = false;

  constructor(private _modalService: ModalService,
    private _componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this._modalService.openModalObserver.subscribe(({modal, model}) => {
      this._closeModal();
      this._openModal({modal, model});
    });
    this._modalService.closeModalObserver.subscribe(() => this._closeModal());
  }

  private _closeModal () {
    this.isModalOpened = false;
    this.modalDialogContainer.clear();
  }

  private _openModal ({modal, model}) {
    let factory = this._componentFactoryResolver.resolveComponentFactory(modal);
    let componentRef = this.modalDialogContainer.createComponent(factory);
    if (model) {
      componentRef.instance.model = model;
    }
    this.isModalOpened = true;
  }
}
