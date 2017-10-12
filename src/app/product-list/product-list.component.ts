import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, OnDestroy } from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import { IProduct } from "../models/product.interface";
import { ProductService } from "../product.service";
import { IProductsFilter } from '../models/products-filter.interface';
import { AuthService } from "../auth.service";
import { ICategory } from "../models/category.interface";
import { ModalService } from "../modal.service";
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';

const productsCountStep = 6;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Output() productsFilter: Subject<IProductsFilter> = new Subject<IProductsFilter>();
  @Output() categories:  Observable<Array<ICategory>>;
  @Output() productShouldDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() canManageProducts: boolean;
  public products: Observable<IProduct[]>;

  private _productsCount: number;
  private _subscriptions: Subscription[] = [];

  constructor(
    private _productService: ProductService,
    private _authService: AuthService,
    private _modalService: ModalService
  ) {
    this.products = this._productService.filteredProducts;
    this.canManageProducts = false;
    this._productsCount = productsCountStep;
    this.categories = this._productService.categories;
  }

  ngOnInit() {
    this._subscriptions.concat([
      this._authService.canUserManageProducts
      .subscribe(value => {
        this.canManageProducts = value;
      }),

      this.productsFilter.subscribe((filter: IProductsFilter) => {
        this._productService.filterProducts(filter);
      }),

      this.productShouldDelete.subscribe(id => {
        this._productService.deleteProduct(id);
      })
    ]);

    this._productService.loadProducts();
    this._productService.loadCategories();
  }

  ngOnDestroy () {
    this._subscriptions.forEach(subsription => subsription.unsubscribe());
  }

  loadMore() {
    this._productsCount += productsCountStep;
    this._productService.getMoreProducts(this._productsCount);
  }

  openAddProductModal () {
    this._modalService.open(AddProductModalComponent, {});
  }
}
