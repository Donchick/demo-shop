import { Injectable } from '@angular/core';
import {Subject, Observable, BehaviorSubject} from "rxjs";
import {DemoShopHttpService} from "./demo-shop-http.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import {Product} from "./product.model";
import {Filter} from "./filter.model";

@Injectable()
export class ProductService {
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private _filterByProps: BehaviorSubject<Filter> = new BehaviorSubject<Filter>(new Filter());
  public filteredProducts: Observable<Product[]>;

  constructor( private demoShopHttpService: DemoShopHttpService ) {
    this.filteredProducts = Observable.combineLatest(this._products, this._filterByProps)
      .debounce(() => Observable.timer(300))
      .map(([products, filterProps]) => {
        return products.reduce((filteredProducts, product) => {
          filteredProducts.push(product);
          return filteredProducts;
        }, new Array<Product>())
          .slice(0, filterProps.productCount);
      });
  }

  getProducts() {
    this.demoShopHttpService.get(`/products`)
      .map(response => response.text())
      .map(jsonProducts => JSON.parse(jsonProducts))
      .subscribe(products => {
        products = products.map(product => new Product(product.id, product.categryId, product.image,
          product.name, product.description, product.cost, product.rating, 1, product.count, product.soldCount));
        this._products.next(products);
      })
  }

  public filterProducts(filter: Filter) {
    this._filterByProps.next(filter);
  }
}
