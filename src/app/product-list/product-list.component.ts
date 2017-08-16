import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../product.model";
import {ProductService} from "../product.service";
import {Filter} from '../filter.model';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;
  productsFilter: Filter;

  private _canManageProducts: boolean;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {
    this.products = this.productService.filteredProducts;
    this.productsFilter = new Filter();
    this._canManageProducts = false;
  }

  ngOnInit() {
    this.authService.canUserManageProducts
      .subscribe(value => {
        this._canManageProducts = value;
      });
    this.productService.getProducts();
  }

  loadMore() {
    this.productsFilter.incProductsCount();
    this.productService.filterProducts(this.productsFilter);
  }
}
