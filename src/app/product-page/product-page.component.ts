import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IProduct} from "../models/product.interface";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css',
    '../../assets/styles/components-styles/product-image.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductPageComponent implements OnInit {
  public _id: number;
  public product: IProduct;

  constructor( private route: ActivatedRoute, private _productService: ProductService) {
    route.params.subscribe(params => this._id = params['id']);
  }

  ngOnInit() {
    this._productService.getProduct(this._id)
      .subscribe((product: IProduct) => {
        this.product = product;
      });
  }

}
