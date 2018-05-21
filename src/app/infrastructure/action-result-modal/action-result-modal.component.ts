import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-result-modal',
  templateUrl: 'action-result-modal.component.html',
  styleUrls: ['action-result-modal.component.css']
})
export class ActionResultModalComponent implements OnInit {
  @Input() model: any;
  @Output() modalShouldBeClosed: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick () {
    this.modalShouldBeClosed.emit();
  }
}
