import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedInGuard } from '../logged-in-guard';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ProductService } from "../product.service";
import { ProductTileComponent } from '../product-tile/product-tile.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductListHeaderComponent } from '../product-list/header/header.component';
import { IonRangeSliderModule } from "ng2-ion-range-slider";

export const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [LoggedInGuard]
  }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductTileComponent,
    ProductListHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonRangeSliderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService
  ]
})
export class MainLayoutModule { }
