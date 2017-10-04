import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { IProduct } from '../models/product.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ICategory } from '../models/category.interface';

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
  @Input() formSubmitted: EventEmitter<IProduct>;
  public productForm: FormGroup;

  constructor (private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this._formBuilder.group({
      name: [this.product.name],
      linkToImage: [this.product.image],
      price: [this.product.cost],
      rating: [this.product.rating],
      gender: [this.product.gender],
      description: [this.product.description],
      category: [this.product.categoryId]
    });

  }

  onSubmit ({name, linkToImage, price, rating, gender, description, category}) {
    let product = {
      id: this.product.id,
      name,
      image: linkToImage,
      cost: price,
      rating,
      gender,
      description,
      categoryId: category,
      count: this.product.count,
      soldCount: this.product.soldCount
    };

    this.formSubmitted.emit(product);
  }
}
