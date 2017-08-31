import { Injectable } from '@angular/core';
import {Subject, Observable, BehaviorSubject} from "rxjs";
import {DemoShopHttpService} from "./demo-shop-http.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import {Product} from "./product.model";
import { IProductsFilter } from "./models/products-filter.interface";

@Injectable()
export class ProductService {
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private _filterByProps: BehaviorSubject<IProductsFilter> = new BehaviorSubject<IProductsFilter>(null);
  private _filterByName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _productsOnPageCount: BehaviorSubject<number> = new BehaviorSubject<number>(6);
  public filteredProducts: Observable<Product[]>;

  constructor( private demoShopHttpService: DemoShopHttpService ) {
    this.filteredProducts = Observable.combineLatest(this._products,
      this._productsOnPageCount, this._filterByProps, this._filterByName)
      .debounce(() => Observable.timer(300))
      .map(([products, productsOnPageCount, filterProps, filterName]) => {
        let filteredProducts = products;

        if (filterName) {
          filteredProducts = filteredProducts.filter(product => product.name.toLowerCase()
            .indexOf(filterName.toLowerCase()) >= 0);
        }

        return filteredProducts.reduce((filteredProducts, product) => {
          filteredProducts.push(product);
          return filteredProducts;
        }, new Array<Product>())
          .slice(0, productsOnPageCount);
      });
  }

  getProducts() {
    this.demoShopHttpService.get(`/products`)
      .map(response => response.text())
      .map(jsonProducts => JSON.parse(jsonProducts))
      .subscribe(products => {
        products = products.map(product => {
          return new Product(product.id, product.categryId, product.image,
            product.name, product.description, product.cost, product.rating, product.gender, product.count, product.soldCount)
        });
        this._products.next(products);
      });
  }

  public filterProducts(filter: IProductsFilter) {
    this._filterByProps.next(filter);
  }

  public filterByName(name: string) {
    this._filterByName.next(name);
  }

  public getMoreProducts(count: number) {
    this._productsOnPageCount.next(count);
  }
}
