import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { IProduct } from '../models/product.interface';
import { ProductService } from "../product.service";
import { ICategory } from '../models/category.interface';
import { Observable } from "rxjs";

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css', '../../assets/styles/components-styles/select-list.css',
    '../../assets/styles/components-styles/radiobuttons-styles.css',
    '../../assets/styles/components-styles/checkbox-styles.css'],
  encapsulation: ViewEncapsulation.None,
  host: {'class': 'edit-product-modal'}
})
export class AddProductModalComponent implements OnInit {
  @Output() modalShouldBeClosed: EventEmitter<any> = new EventEmitter<any>();
  @Output() categories: ICategory[];
  @Output() newProduct: IProduct;
  public categoriesObserver: Observable<Array<ICategory>>;
  public modalTitle: string;

  constructor (private _productService: ProductService) {
    this.categoriesObserver = this._productService.categories;
    this.newProduct = {
      name: '',
      description: '',
      categoryId: null,
      image: '',
      cost: null,
      rating: null,
      gender: null
    }
  }

  ngOnInit() {
    this._productService.loadCategories();

    this.categoriesObserver
      .debounce(() => Observable.timer(300))
      .subscribe(categories => {
        this.categories = categories;
      });

    this.modalTitle = `Add new product`;
  }

  onFormSubmit (product: IProduct): void {
    this._productService.addProduct(product)
      .subscribe(product => {
        this.modalShouldBeClosed.emit();
      });
  }

  closeDialog () {
    this.modalShouldBeClosed.emit();
  }
}
