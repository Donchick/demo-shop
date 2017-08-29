import { Component, OnInit, ViewEncapsulation, Output } from '@angular/core';
import {Observable, Observer, BehaviorSubject} from "rxjs";
import {Product} from "../product.model";
import {ProductService} from "../product.service";
import {Filter} from '../filter.model';
import {AuthService} from "../auth.service";
const productsCountStep = 6;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
  @Output() productsFilter: BehaviorSubject<Filter> = new BehaviorSubject<Filter>(new Filter());
  products: Observable<Product[]>;

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

    this.productsFilter.subscribe(filter => {});

    this._productService.getProducts();
  }

  loadMore() {
    this._productsCount += productsCountStep;
    this._productService.getMoreProducts(this._productsCount);
  }
}
