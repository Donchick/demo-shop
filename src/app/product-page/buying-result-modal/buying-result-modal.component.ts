import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buying-result-modal',
  templateUrl: './buying-result-modal.component.html',
  styleUrls: ['./buying-result-modal.component.css']
})
export class BuyingResultModalComponent implements OnInit {
  @Input() model: any;
  @Output() modalShouldBeClosed: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  
  onClick () {
    this.modalShouldBeClosed.emit();
  }
}
