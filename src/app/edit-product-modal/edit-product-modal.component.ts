import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { IProduct } from '../models/product.interface';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {'class': 'edit-product-modal modal-dialog'}
})
export class EditProductModalComponent implements OnInit {
  @Input() product: IProduct;

  constructor() { }

  ngOnInit() {
  }

}
