import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {DemoShopHttpService} from "./demo-shop-http.service";
import 'rxjs/add/operator/map';
import {Product} from "./product.model";

@Injectable()
export class ProductService {
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public filteredProducts: Observable<Product[]>;

  constructor( private demoShopHttpService: DemoShopHttpService ) {
    this.filteredProducts = this._products;
  }

  getProducts(count: number = 6) {
    let firstPosition = 0;//this._products.length;
    let lastPosition = firstPosition + count;
    this.demoShopHttpService.get(`/products?_start=${firstPosition}&_end=${lastPosition}`)
      .map(response => response.text())
      .map(jsonProducts => JSON.parse(jsonProducts))
      .subscribe(products => {
        products = products.map(product => new Product(product.id, product.categryId, product.image,
          product.name, product.description, product.cost, product.rating, 1, product.count, product.soldCount));
        this._products.next(products);
      })
  }

}
