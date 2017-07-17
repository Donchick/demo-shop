import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../product.model";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;

  constructor(
    private productService: ProductService
  ) {
    this.products = this.productService.filteredProducts;
  }

  ngOnInit() {
    this.productService.getProducts();
  }

}
