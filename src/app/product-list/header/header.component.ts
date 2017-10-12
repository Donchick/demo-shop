import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ProductService} from "../../product.service";
import { Subject } from "rxjs";
import { Gender } from '../../models/gender';
import { ICategory } from '../../models/category.interface';
import { IProductsFilter } from '../../models/products-filter.interface';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-list-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../assets/styles/components-styles/select-list.css',
    '../../../assets/styles/components-styles/radiobuttons-styles.css',
    '../../../assets/styles/components-styles/checkbox-styles.css']
})
export class ProductListHeaderComponent implements OnInit {
  @Input() productsFilter: Subject<IProductsFilter>;
  @Input() categories: Array<ICategory>;
  @Output() shouldOpenAddingProductForm: EventEmitter<any> = new EventEmitter<any>();
  @Input() canManageProducts: boolean;
  public genderOptions = Object.keys(Gender).reduce((acc, key: any) => {
    if (isNaN(key * 1)) {
      acc.push(key);
    }
    return acc;
  }, []);
  public genderEnum = Gender;

  private showFilters: boolean;
  public filterForm: FormGroup;
  public readonly initialCategory = {
    id: -1,
    name: 'All'
  };
  public readonly initialGender = "All";
  public readonly ratingRange = {
    from: 0,
    to: 5
  };
  public readonly priceRange = {
    from: 0,
    to: 1000
  };

  constructor(private _productService: ProductService, private _formBuilder: FormBuilder) {
    this.showFilters = false;
  }

  ngOnInit() {
    this.filterForm = this._formBuilder.group({
      availableOnly: [false],
      gender: [this.initialGender],
      rating: {
        from: this.ratingRange.from,
        to: this.ratingRange.to
      },
      price: {
        from: this.priceRange.from,
        to: this.priceRange.to
      },
      category: this.initialCategory
    });
    this.filterForm.valueChanges.subscribe(filter => {
      this.productsFilter.next(filter);
    });
  }

  addProduct (e) {
    e.stopPropagation();
    this.shouldOpenAddingProductForm.emit();
  }

  filterByName (target) {
    let value = target.value;
    this._productService.filterByName(value);
  }

  toggleFilters () {
    this.showFilters = !this.showFilters;
  }

  ratingRangeChanged (data: any) {
    this.filterForm.patchValue({
      rating: {
        from: data.from,
        to: data.to
      }
    });
  }

  priceRangeChanged (data: any) {
    this.filterForm.patchValue({
      price: {
        from: data.from,
        to: data.to
      }
    });
  }
}
