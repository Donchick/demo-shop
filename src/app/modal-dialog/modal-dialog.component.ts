import {Component, OnInit, Input, EventEmitter, ElementRef} from '@angular/core';
import { ModalService } from '../modal.service'

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
  @Input() title: string;
  @Input() modalShouldBeClosed: EventEmitter<any>;

  constructor(
    private _modal: ElementRef,
    private _modalService: ModalService
  ) { }

  ngOnInit() {
    this.modalShouldBeClosed.subscribe(() => {
      this._closeModal();
    });

    $(document).on('click.modal-dialog', this._onClick.bind(this));
  }

  private _closeModal () {
    this._modalService.closeModal();
    $(document).off('click.modal-dialog');
  }

  private _onClick (e) {
    if (!this._modal.nativeElement.contains(e.target)) {
      this._closeModal();
      e.stopPropagation();
    }
  }
}
