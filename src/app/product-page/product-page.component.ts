import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IProduct} from "../models/product.interface";
import {ICategory} from "../models/category.interface";
import {ProductService} from "../product.service";
import {ModalService} from "../modal.service";
import { AuthService } from "../auth.service";
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import { ActionResultModalComponent } from '../action-result-modal/action-result-modal.component';
import { Gender } from '../models/gender';
import { Observable } from "rxjs";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css',
    '../../assets/styles/components-styles/product-image.css']
})
export class ProductPageComponent implements OnInit {
  private _id: number;
  private _categories: ICategory[];
  public product: IProduct;
  public category: string;
  public canManageProducts: boolean = false;
  public showLoadingOverlay: boolean = false;

  constructor( private route: ActivatedRoute,
    private _productService: ProductService,
    private _modalService: ModalService,
    private _authService: AuthService) {
    route.params.subscribe(params => this._id = parseInt(params['id'], 10));
  }

  ngOnInit() {
    this._productService.categories
      .subscribe(categories => this._categories = categories);

    this._productService.products
      .subscribe(products => {
        if (products.length > 0) {
          this.product = products.find(product => product.id === this._id);
          this.category = this._categories.find(category => category.id === this.product.categoryId).name;
        } else {
          this._productService.loadProducts();
        }
      });

    this._authService.canUserManageProducts
      .subscribe(canManage => this.canManageProducts = canManage);
  }

  openEditModal (e) {
    e.stopPropagation();
    e.preventDefault();
    this._modalService.open(EditProductModalComponent, this.product);
  }

  get isProductOutOfStock (): boolean {
    return this.product.soldCount >= this.product.count;
  }

  onBuyProduct (e) {
    e.stopPropagation();
    if (this.product.count > this.product.soldCount) {
      this.showLoadingOverlay = true;
      const productModel = {
        id: this.product.id,
        categoryId: this.product.categoryId,
        image: this.product.image,
        name: this.product.name,
        description: this.product.description,
        cost: this.product.cost,
        rating: this.product.rating,
        gender: Gender[Gender[this.product.gender]],
        count: this.product.count,
        soldCount: this.product.soldCount + 1
      };
      this._productService.updateProduct(productModel)
        .catch((err: any) => {
          this._modalService.open(ActionResultModalComponent, {message: 'There was some error on server, your last action has been declined'});
          return Observable.throw(err);
        })
        .finally(() => this.showLoadingOverlay = false)
        .subscribe(product => {
          if (product.count >= product.soldCount) {
            this.product = product;
            this._modalService.open(ActionResultModalComponent, {message: 'You bought product successfully'});
          } else {
            productModel.soldCount++;
            this._productService.updateProduct(productModel)
              .subscribe((rejectedProduct) => {
                this.product = rejectedProduct;
                this._modalService.open(ActionResultModalComponent, {message: 'You can\'t buy this product because we don\'t have it in stock'});
              });
          }
        });
    } else {
      this._modalService.open(ActionResultModalComponent, {message: 'You can\'t buy this product because we don\'t have it in stock'});
    }
  }

  increaseProductCount (e) {
    e.stopPropagation();
    e.preventDefault();
    this.showLoadingOverlay = true;

    const productModel = {
      id: this.product.id,
      categoryId: this.product.categoryId,
      image: this.product.image,
      name: this.product.name,
      description: this.product.description,
      cost: this.product.cost,
      rating: this.product.rating,
      gender: Gender[Gender[this.product.gender]],
      count: this.product.count,
      soldCount: this.product.soldCount
    };

    productModel.count = Number(productModel.count) + 5;

    this._productService.updateProduct(productModel)
      .catch((err: any) => {
        this._modalService.open(ActionResultModalComponent, {message: 'There was some error on server, your last action has been declined'});
        return Observable.throw(err);
      })
      .finally(() => this.showLoadingOverlay = false)
      .subscribe(product => {
        this.product = product;
        this._modalService.open(ActionResultModalComponent, {message: 'You increased product quantity successfully'});
      });
  }
}
