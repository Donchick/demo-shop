import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { IProduct } from '../models/product.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from "../product.service";
import { Gender } from '../models/gender';
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
  public productForm: FormGroup;
  categories: Observable<Array<ICategory>>;
  public modalTitle: string;

  constructor(private _productService: ProductService,
              private _formBuilder: FormBuilder) {
    this.categories = this._productService.categories;
  }

  ngOnInit() {
    this._productService.loadCategories();
    this.productForm = this._formBuilder.group({
      name: [this.product.name],
      linkToImage: [this.product.imageSrc],
      price: [this.product.cost],
      rating: [this.product.rating],
      gender: [Gender[this.product.gender]],
      description: [this.product.description],
      category: []
    });

    this.categories
      .debounce(() => Observable.timer(300))
      .subscribe(categories => {
      this.productForm.controls['category'].setValue(categories.find(category => category.id === this.product.categoryId));
    });

    this.modalTitle = `Edit "${this.product.name}"`;
  }

  onSubmit (value) {
    console.log(value);
  }
}
