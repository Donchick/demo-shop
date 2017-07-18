import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../product.model";
import {ProductService} from "../product.service";
import {Filter} from '../filter.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;
  productsFilter: Filter;

  constructor(
    private productService: ProductService
  ) {
    this.products = this.productService.filteredProducts;
    this.productsFilter = new Filter();
  }

  ngOnInit() {
    this.productService.getProducts();
  }

  loadMore() {
    this.productsFilter.incProductsCount();
    this.productService.filterProducts(this.productsFilter);
  }
}
