import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ModalService } from '../modal.service'

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
  @Input() title: string;
  @Input() modalShouldBeClosed: EventEmitter<any>;

  constructor(private _modalService: ModalService) { }

  ngOnInit() {
    this.modalShouldBeClosed.subscribe((event) => {
      this._closeModal();
    })
  }

  private _closeModal () {
    this._modalService.closeModal();
  }
}
