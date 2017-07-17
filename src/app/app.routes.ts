import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from "./login-page/login-page.component";
import { ProductListComponent } from "./product-list/product-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'product-list',
    component: ProductListComponent
  }
];

export const appRoutes =
  RouterModule.forRoot(routes);

