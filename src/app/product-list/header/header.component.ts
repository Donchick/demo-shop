import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../product.service";

@Component({
  selector: 'app-product-list-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../assets/styles/components-styles/select-list.css',
    '../../../assets/styles/components-styles/radiobuttons-styles.css',
    '../../../assets/styles/components-styles/checkbox-styles.css']
})
export class ProductListHeaderComponent implements OnInit {
  private showFilters: boolean;

  constructor(private _productService: ProductService) {
    this.showFilters = false;
  }

  ngOnInit() {
  }

  filterByName (target) {
    let value = target.value;
    this._productService.filterByName(value);
  }

  toggleFilters () {
    this.showFilters = !this.showFilters;
  }

  ratingChanged (data: any) {
    console.log('Rating', data);
  }
}
