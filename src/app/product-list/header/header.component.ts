import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../product.service";

@Component({
  selector: 'app-product-list-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class ProductListHeaderComponent implements OnInit {

  constructor(private _productService: ProductService) { }

  ngOnInit() {
  }

  filterByName (target) {
    let value = target.value;
    this._productService.filterByName(value);
  }
}
