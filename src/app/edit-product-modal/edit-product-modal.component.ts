import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { IProduct } from '../models/product.interface';
import { ProductService } from "../product.service";
import { ICategory } from '../models/category.interface';
import { Observable } from "rxjs";

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css', '../../assets/styles/components-styles/select-list.css',
    '../../assets/styles/components-styles/radiobuttons-styles.css',
    '../../assets/styles/components-styles/checkbox-styles.css'],
  encapsulation: ViewEncapsulation.None,
  host: {'class': 'edit-product-modal modal-dialog'}
})
export class EditProductModalComponent implements OnInit {
  @Input() product: IProduct;
  @Output() modalShouldBeClosed: EventEmitter<any> = new EventEmitter<any>();
  @Output() formSubmitted: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() categories: ICategory[];
  public categoriesObserver: Observable<Array<ICategory>>;
  public modalTitle: string;

  constructor (private _productService: ProductService) {
    this.categoriesObserver = this._productService.categories;
  }

  ngOnInit() {
    this._productService.loadCategories();

    this.categoriesObserver
      .debounce(() => Observable.timer(300))
      .subscribe(categories => {
        this.categories = categories;
    });

    this.modalTitle = `Edit "${this.product.name}"`;

    this.formSubmitted.subscribe((product: IProduct) => {
      this._productService.updateProduct(product)
        .subscribe(product => {
          this.modalShouldBeClosed.emit();
        });
    });
  }

  closeDialog () {
    this.modalShouldBeClosed.emit();
  }
}
