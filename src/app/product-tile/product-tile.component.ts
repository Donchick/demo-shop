import { Component, OnInit, Input, ViewEncapsulation, HostBinding } from '@angular/core';
import { IProduct } from "../models/product.interface";

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductTileComponent implements OnInit {
  @Input() product: IProduct;

  constructor() { }

  ngOnInit() {
  }

  @HostBinding('attr.class') class='product-tile';
}
