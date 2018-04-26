import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import {DemoShopHttpService} from "./demo-shop-http.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/toPromise';
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

    if (Gender[filter.gender] && Gender[Gender[filter.gender]] !== product.gender) {
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
  private _totalProductsCount: number;
  public filteredProducts: Observable<IProduct[]>;
  public products: Observable<IProduct[]> = this._products.publishReplay(1).refCount();
  public categories: Observable<Array<ICategory>> = this._categories.publishReplay(1).refCount();
  public allProductsLoaded: boolean = false;
  public filterState: IProductsFilter = null;

  constructor( private demoShopHttpService: DemoShopHttpService ) {
    this.filteredProducts = Observable.combineLatest(this._products,
      this._productsOnPageCount, this._filterByProps, this._filterByName)
      .debounce(() => Observable.timer(300))
      .map(([products, productsOnPageCount, filterProps, filterName]) => {
        let filteredProducts = filterProps ? filterSubject(products, filterProps) : products;

        if (filterName) {
          filteredProducts = filteredProducts.filter(product => {
            return product.name.toLowerCase().indexOf(filterName.toLowerCase()) >= 0
              || product.description.toLowerCase().indexOf(filterName.toLowerCase()) >= 0;
          });
        }

        return filteredProducts.reduce((filteredProducts, product) => {
          filteredProducts.push(product);
          return filteredProducts;
        }, new Array<IProduct>())
          .slice(0, productsOnPageCount);
      });
  }

  private _buildProductModel (object): IProduct {
    return {
      id: object.id,
      categoryId: object.categoryId,
      image: object.image,
      name: object.name,
      description: object.description,
      cost: object.cost,
      rating: object.rating,
      gender: Gender[Gender[object.gender]],
      count: object.count,
      soldCount: object.soldCount
    }
  }

  public loadProducts () {
    let productObservable = this.demoShopHttpService.get(`/products`)
      .map(response => response.text())
      .map(jsonProducts => JSON.parse(jsonProducts));

      productObservable.subscribe(products => {
        products = products.map((product): IProduct => this._buildProductModel(product));
        this._products.next(products);

        this._totalProductsCount = products.length;
      });

      return productObservable;
  }

  public getProduct (productId: number) {
    return this.demoShopHttpService.get('/products', `id=${productId}`)
      .map(response => response.text())
      .map(jsonProducts => JSON.parse(jsonProducts))
      .map(products => this._buildProductModel(products[0]))
      .share();
  }

  public updateProduct(product: IProduct) {
    let productUpdateObserver = this.demoShopHttpService.put(`/products/${product.id}`, product)
      .map(response => response.text())
      .map(jsonProduct => JSON.parse(jsonProduct))
      .map(product => this._buildProductModel(product))
      .share();

    productUpdateObserver.subscribe(this.loadProducts.bind(this));

    return productUpdateObserver;
  }

  public addProduct(product: IProduct) {
    let productAddObserver = this.demoShopHttpService.post(`/products`, product)
      .map(response => response.text())
      .map(jsonProduct => JSON.parse(jsonProduct))
      .map(product => this._buildProductModel(product))
      .share();

    productAddObserver.subscribe(this.loadProducts.bind(this));

    return productAddObserver;
  }

  public deleteProduct(productId: number) {
    this.demoShopHttpService.deleteProduct(`/products/${productId}`)
      .map(response => response.text())
      .map(resp => JSON.parse(resp))
      .subscribe(this.loadProducts.bind(this));
  }

  public loadCategories () {
    this.demoShopHttpService.get(`/categories`)
      .map(response => response.text())
      .map(jsonCategories => JSON.parse(jsonCategories))
      .subscribe(categories => this._categories.next(categories));
  }

  public filterProducts(filter: IProductsFilter) {
    this.filterState = filter;
    this.loadProducts().toPromise()
      .then(() => this._filterByProps.next(filter));
  }

  public filterByName(name: string) {
    this.loadProducts().toPromise()
      .then(() => this._filterByName.next(name));

  }

  public getMoreProducts(count: number) {
    if (this._totalProductsCount <= count) {
      this._productsOnPageCount.next(this._totalProductsCount);
      this.allProductsLoaded = true;
    } else {
      this._productsOnPageCount.next(count);
    }
  }
}
