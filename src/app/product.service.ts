import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import {DemoShopHttpService} from "./demo-shop-http.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import { IProduct } from "./models/product.interface";
import { IProductsFilter } from "./models/products-filter.interface";
import { Gender } from './models/gender';
import {ICategory} from "./models/category.interface";


const filterSubject = function (products: Array<IProduct>, filter: IProductsFilter): Array<IProduct> {
  return products.reduce((products: Array<IProduct>, product: IProduct) => {
    if (filter.category.id !== -1 && product.categoryId !== filter.category.id) {
      return products;
    }

    if (filter.availableOnly && product.count <= 0) {
      return products;
    }

    if (filter.gender !== Gender.Unisex && filter.gender !== product.gender) {
      return products;
    }

    if (filter.rating.from  > product.rating || filter.rating.to < product.rating) {
      return products;
    }

    if (filter.price.from  > product.cost || filter.price.to < product.cost) {
      return products;
    }

    products.push(product);
    return products;
  }, []);
};

@Injectable()
export class ProductService {
  private _products: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  private _filterByProps: BehaviorSubject<IProductsFilter> = new BehaviorSubject<IProductsFilter>(null);
  private _filterByName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _productsOnPageCount: BehaviorSubject<number> = new BehaviorSubject<number>(6);
  private _categories: BehaviorSubject<Array<ICategory>> = new BehaviorSubject<Array<ICategory>>([]);
  public filteredProducts: Observable<IProduct[]>;
  public categories: Observable<Array<ICategory>> = this._categories.asObservable();

  constructor( private demoShopHttpService: DemoShopHttpService ) {
    this.filteredProducts = Observable.combineLatest(this._products,
      this._productsOnPageCount, this._filterByProps, this._filterByName)
      .debounce(() => Observable.timer(300))
      .map(([products, productsOnPageCount, filterProps, filterName]) => {
        let filteredProducts = filterProps ? filterSubject(products, filterProps) : products;

        if (filterName) {
          filteredProducts = filteredProducts.filter(product => product.name.toLowerCase()
            .indexOf(filterName.toLowerCase()) >= 0);
        }

        return filteredProducts.reduce((filteredProducts, product) => {
          filteredProducts.push(product);
          return filteredProducts;
        }, new Array<IProduct>())
          .slice(0, productsOnPageCount);
      });
  }

  getProducts() {
    this.demoShopHttpService.get(`/products`)
      .map(response => response.text())
      .map(jsonProducts => JSON.parse(jsonProducts))
      .subscribe(products => {
        products = products.map(product => {
          return {
            id: product.id,
            categoryId: product.categoryId,
            imageSrc: product.image,
            name: product.name,
            description: product.description,
            cost: product.cost,
            rating: product.rating,
            gender: Gender[product.gender],
            count: product.count,
            soldCount: product.soldCount}
        });
        this._products.next(products);
      });
  }

  loadCategories () {
    this.demoShopHttpService.get(`/categories`)
      .map(response => response.text())
      .map(jsonCategories => JSON.parse(jsonCategories))
      .subscribe(categories => this._categories.next(categories));
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
