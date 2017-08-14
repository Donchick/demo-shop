import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from "./login-page/login-page.component";
import {LoggedInGuard} from "./logged-in-guard";
import {UnAuthGuard} from "./un-auth-guard";
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import { routes as childRoutes, MainLayoutModule } from './main-layout/main-layout.module';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [UnAuthGuard]
  },
  {
    path: '',
    redirectTo: 'main-layout',
    pathMatch: 'full'
  },
  {
    path: 'main-layout',
    component: MainLayoutComponent,
    canActivate: [LoggedInGuard],
    children: childRoutes
  }
];

export const appRoutes =
  RouterModule.forRoot(routes);

