import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from "./login-page/login-page.component";
import { ProductListComponent } from "./product-list/product-list.component";
import {LoggedInGuard} from "./logged-in-guard";
import {UnAuthGuard} from "./un-auth-guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [UnAuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [LoggedInGuard]
  }
];

export const appRoutes =
  RouterModule.forRoot(routes);

