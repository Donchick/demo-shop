import {Component, OnInit, Input} from '@angular/core';
import {ProductService} from "../../product.service";
import { Observable, Subject } from "rxjs";
import { Gender } from '../../gender';
import { IProductsFilter } from '../../models/products-filter.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import {isBoolean} from "util";

@Component({
  selector: 'app-product-list-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../assets/styles/components-styles/select-list.css',
    '../../../assets/styles/components-styles/radiobuttons-styles.css',
    '../../../assets/styles/components-styles/checkbox-styles.css']
})
export class ProductListHeaderComponent implements OnInit {
  @Input() productsFilter: Subject<IProductsFilter>;
  private showFilters: boolean;
  public filterForm: FormGroup;

  constructor(private _productService: ProductService, formBuilder: FormBuilder) {
    this.showFilters = false;
    this.filterForm = formBuilder.group({
      availableOnly: [false],
      gender: [Gender.Unisex],
      ratingFrom: [0],
      ratingTo: [5],
      priceFrom: [0],
      priceTo: [1000]
    });
  }

  ngOnInit() {
    this.filterForm.valueChanges.subscribe(filter => {
      this.productsFilter.next(filter);
    });
  }

  filterByName (target) {
    let value = target.value;
    this._productService.filterByName(value);
  }

  toggleFilters () {
    this.showFilters = !this.showFilters;
  }

  ratingRangeChanged (data: any) {
    console.log('Rating', data);
  }

  priceRangeChanged (data: any) {

  }
}
