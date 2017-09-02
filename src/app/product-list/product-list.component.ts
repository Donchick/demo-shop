import { Component, OnInit, ViewEncapsulation, Output } from '@angular/core';
import {Observable, Observer, Subject} from "rxjs";
import { IProduct } from "../models/product.interface";
import { ProductService } from "../product.service";
import { IProductsFilter } from '../models/products-filter.interface';
import { AuthService } from "../auth.service";
import { ICategory } from "../models/category";
const productsCountStep = 6;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
  @Output() productsFilter: Subject<IProductsFilter> = new Subject<IProductsFilter>();
  products: Observable<IProduct[]>;
  categories: Array<ICategory> = [{
    id: -1, name: 'All'
  }, {
    id: 0, name: 'Jeans'
  }, {
    id: 1, name: 'Shirts'
  }, {
    id: 2, name: 'Shoes'
  }, {
    id: 3, name: 'Accessories'
  }];

  private _productsCount: number;
  private _canManageProducts: boolean;

  constructor(
    private _productService: ProductService,
    private _authService: AuthService
  ) {
    this.products = this._productService.filteredProducts;
    this._canManageProducts = false;
    this._productsCount = productsCountStep;
  }

  ngOnInit() {
    this._authService.canUserManageProducts
      .subscribe(value => {
        this._canManageProducts = value;
      });

    this.productsFilter.subscribe((filter: IProductsFilter) => {
      this._productService.filterProducts(filter);
    });

    this._productService.getProducts();
  }

  loadMore() {
    this._productsCount += productsCountStep;
    this._productService.getMoreProducts(this._productsCount);
  }
}
