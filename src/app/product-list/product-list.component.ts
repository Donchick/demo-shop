import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import {Observable, Observer, Subject} from "rxjs";
import { IProduct } from "../models/product.interface";
import { ProductService } from "../product.service";
import { IProductsFilter } from '../models/products-filter.interface';
import { AuthService } from "../auth.service";
import { ICategory } from "../models/category.interface";
const productsCountStep = 6;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
  @Output() productsFilter: Subject<IProductsFilter> = new Subject<IProductsFilter>();
  @Output() categories:  Observable<Array<ICategory>>;
  @Output() productShouldDelete: EventEmitter<number> = new EventEmitter<number>();
  products: Observable<IProduct[]>;

  private _productsCount: number;
  private _canManageProducts: boolean;

  constructor(
    private _productService: ProductService,
    private _authService: AuthService
  ) {
    this.products = this._productService.filteredProducts;
    this._canManageProducts = false;
    this._productsCount = productsCountStep;
    this.categories = this._productService.categories;
  }

  ngOnInit() {
    this._authService.canUserManageProducts
      .subscribe(value => {
        this._canManageProducts = value;
      });

    this.productsFilter.subscribe((filter: IProductsFilter) => {
      this._productService.filterProducts(filter);
    });

    this.productShouldDelete.subscribe(id => {
      this._productService.deleteProduct(id);
    });

    this._productService.loadProducts();
    this._productService.loadCategories();
  }

  loadMore() {
    this._productsCount += productsCountStep;
    this._productService.getMoreProducts(this._productsCount);
  }

  deleteProduct (id) {

  }
}
