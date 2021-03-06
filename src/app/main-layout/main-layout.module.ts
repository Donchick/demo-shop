import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedInGuard } from '../guards/logged-in-guard';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ProductService } from "../services/product/product.service";
import { ProductPageComponent } from '../product-management/product-page/product-page.component';
import { ProductTileComponent } from '../products-list/product-tile/product-tile.component';
import { ProductListComponent } from '../products-list/product-list/product-list.component';
import { ProductListHeaderComponent } from '../products-list/product-list/header/header.component';
import { EditProductModalComponent } from '../product-management/edit-product-modal/edit-product-modal.component';
import { AddProductModalComponent } from '../product-management/add-product-modal/add-product-modal.component';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { ModalService } from "../services/modal/modal.service";
import { ModalDialogComponent } from '../infrastructure/modal-dialog/modal-dialog.component';
import { ProductFormComponent } from '../product-management/product-form/product-form.component';
import { ActionResultModalComponent } from '../infrastructure/action-result-modal/action-result-modal.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { InfiniteScrollListComponent } from '../infrastructure/infinite-scroll-list/infinite-scroll-list.component';
import {LoadingOverlayComponent} from '../infrastructure/loading-overlay/loading-overlay.component';
import {AppModule} from '../app.module';
import {SharedModule} from '../infrastructure/shared/shared.module';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'product-list',
    pathMatch: 'full'
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'product-page/:id',
    component: ProductPageComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductTileComponent,
    ProductListHeaderComponent,
    EditProductModalComponent,
    ModalDialogComponent,
    ProductFormComponent,
    AddProductModalComponent,
    ActionResultModalComponent,
    NotFoundComponent,
    InfiniteScrollListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonRangeSliderModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    ProductService,
    ModalService
  ],
  entryComponents: [
    EditProductModalComponent,
    AddProductModalComponent,
    ActionResultModalComponent
  ]
})
export class MainLayoutModule { }
