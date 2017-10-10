import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IProduct} from "../models/product.interface";
import {ProductService} from "../product.service";
import {ModalService} from "../modal.service";
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import { BuyingResultModalComponent } from './buying-result-modal/buying-result-modal.component';
import { Gender } from '../models/gender';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css',
    '../../assets/styles/components-styles/product-image.css']
})
export class ProductPageComponent implements OnInit {
  public _id: number;
  public product: IProduct;

  constructor( private route: ActivatedRoute, private _productService: ProductService, private _modalService: ModalService) {
    route.params.subscribe(params => this._id = params['id']);
  }

  ngOnInit() {
    this._productService.products
      .subscribe(products => {
        this.product = products.find(product => product.id === this._id * 1);
      });
  }

  openEditModal (e) {
    e.stopPropagation();
    this._modalService.open(EditProductModalComponent, this.product);
  }

  get isProductOutOfStock (): boolean {
    return this.product.soldCount >= this.product.count;
  }

  onBuyProduct (e) {
    e.stopPropagation();
    if (this.product.count > this.product.soldCount) {
      var productModel = {
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
        .subscribe(product => {
          if (product.count > product.soldCount) {
            this.product = product;
            this._modalService.open(BuyingResultModalComponent, {message: 'You bought product successfully'});
          } else {
            productModel.soldCount++;
            this._productService.updateProduct(productModel)
              .subscribe((rejectedProduct) => {
                this.product = rejectedProduct;
                this._modalService.open(BuyingResultModalComponent, {message: 'You can\'t buy this product because we don\'t have it in stock'});
              });
          }
        });
    } else {
      this._modalService.open(BuyingResultModalComponent, {message: 'You can\'t buy this product because we don\'t have it in stock'});
    }
  }
}
