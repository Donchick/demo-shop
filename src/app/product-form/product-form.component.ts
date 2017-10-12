import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { IProduct } from '../models/product.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICategory } from '../models/category.interface';
import { Gender } from '../models/gender';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css', '../../assets/styles/components-styles/select-list.css',
    '../../assets/styles/components-styles/radiobuttons-styles.css',
    '../../assets/styles/components-styles/checkbox-styles.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductFormComponent implements OnInit {
  @Input() product: IProduct;
  @Input() categories: ICategory[];
  @Input() isNewProduct: boolean = false;
  @Output() formSubmit: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  public productForm: FormGroup;
  public genderOptions = Object.keys(Gender).reduce((acc, key: any) => {
    if (isNaN(key * 1)) {
      acc.push(key);
    }
    return acc;
  }, []);
  public genderEnum = Gender;

  constructor (private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this._formBuilder.group({
      name: [this.product.name, Validators.required],
      linkToImage: [this.product.image, Validators.required],
      price: [this.product.cost, Validators.compose([Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)])],
      rating: [this.product.rating, Validators.required],
      gender: [Gender[this.product.gender], Validators.required],
      description: [this.product.description, Validators.required],
      category: [this.product.categoryId, Validators.required]
    });

  }

  onSubmit ({name, linkToImage, price, rating, gender, description, category}) {
    if (!this.productForm.valid) {
      return;
    }

    let product = {
      id: this.product.id,
      name,
      image: linkToImage,
      cost: price,
      rating,
      gender: Gender[gender],
      description,
      categoryId: category,
      count: this.product.count,
      soldCount: this.product.soldCount
    };

    this.formSubmit.next(product);
  }
}
