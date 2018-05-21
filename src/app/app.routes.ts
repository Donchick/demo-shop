import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from "./login-page/login-page.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import {LoggedInGuard} from "./guards/logged-in-guard";
import {UnAuthGuard} from "./guards/un-auth-guard";
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import { routes as childRoutes } from './main-layout/main-layout.module';

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
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];

export const appRoutes =
  RouterModule.forRoot(routes);

