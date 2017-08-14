import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedInGuard } from '../logged-in-guard';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {ProductService} from "../product.service";
import { ProductTileComponent } from '../product-tile/product-tile.component';
import { ProductListComponent } from '../product-list/product-list.component';

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
    ProductTileComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MainLayoutModule { }
