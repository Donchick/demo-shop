import {Component, OnInit, Input, ViewEncapsulation, HostBinding, EventEmitter} from '@angular/core';
import { IProduct } from "../models/product.interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductTileComponent implements OnInit {
  @Input() product: IProduct;
  @Input() productShouldDelete: EventEmitter<number>;
  @Input() canManageProducts: boolean;
  public showLoadingOverlay: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  deleteProduct () {
    this.showLoadingOverlay = true;
    this.productShouldDelete.emit(this.product.id);
  }

  @HostBinding('attr.class') class='product-tile';
}
