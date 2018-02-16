import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.css']
})
export class LoadingOverlayComponent implements OnInit {
  @Input() hideShadowOverlay: boolean;

  constructor() { }

  ngOnInit() {
  }

}
