import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedInGuard } from '../logged-in-guard';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ProductService } from "../product.service";
import { ProductPageComponent } from '../product-page/product-page.component';
import { ProductTileComponent } from '../product-tile/product-tile.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductListHeaderComponent } from '../product-list/header/header.component';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import {ModalService} from "../modal.service";

export const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'product-page/:id',
    component: ProductPageComponent,
    canActivate: [LoggedInGuard]
  }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductTileComponent,
    ProductListHeaderComponent,
    EditProductModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonRangeSliderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    ModalService
  ],
  entryComponents: [
    EditProductModalComponent
  ]
})
export class MainLayoutModule { }
