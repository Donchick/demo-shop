import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  host: {class: 'not-found-page'}
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
