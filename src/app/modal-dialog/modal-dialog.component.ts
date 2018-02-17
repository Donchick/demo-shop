import {Component, OnInit, Input, EventEmitter, ElementRef, ViewEncapsulation} from '@angular/core';
import { ModalService } from '../modal.service'

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css'],
  host: {'class': 'modal-dialog'},
  encapsulation: ViewEncapsulation.None
})
export class ModalDialogComponent implements OnInit {
  @Input() title: string;
  @Input() modalShouldBeClosed: EventEmitter<any>;
  @Input() showLoadingOverlay: boolean = false;
  private clickHandler: EventListenerOrEventListenerObject;

  constructor(
    private _modal: ElementRef,
    private _modalService: ModalService
  ) { }

  ngOnInit() {
    this.clickHandler = this._onClick.bind(this);

    this.modalShouldBeClosed.subscribe(() => {
      this._closeModal();
    });

    document.addEventListener('click', this.clickHandler);
  }

  private _closeModal () {
    this._modalService.closeModal();

    document.removeEventListener('click', this.clickHandler);
  }

  private _onClick (e) {
    if (!this._modal.nativeElement.contains(e.target)) {
      this._closeModal();
      e.stopPropagation();
    }
  }
}
