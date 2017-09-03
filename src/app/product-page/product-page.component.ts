import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductPageComponent implements OnInit {
  public _id: string;

  constructor( private route: ActivatedRoute) {
    route.params.subscribe(params => this._id = params['id']);
  }

  ngOnInit() {
  }

}
