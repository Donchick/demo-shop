import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DemoShopHttpService } from './demo-shop-http.service';
import { AuthService } from './auth.service';
import {Ng2Webstorage} from 'ngx-webstorage';
import { appRoutes } from './app.routes';
import {ProductService} from "./product.service";
import {LoggedInGuard} from "./guards/logged-in-guard";
import {UnAuthGuard} from "./guards/un-auth-guard";
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {MainLayoutModule} from "./main-layout/main-layout.module";
import { ProductPageComponent } from './product-management/product-page/product-page.component';
import { ActionResultPopupService } from './action-result-popup.service';
import {SharedModule} from './infrastructure/shared/shared.module';
import { GlobalErrorHandler } from './global-error-handler';
import { environment } from '../environments/environment';
import { AppConfig } from './app.config';

export function appInitFactory (config: AppConfig) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainLayoutComponent,
    ProductPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    Ng2Webstorage,
    appRoutes,
    MainLayoutModule,
    SharedModule
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: appInitFactory, deps: [AppConfig], multi: true },
    { provide: 'SESSION_TOKEN_KEY', useValue: 'session-token' },
    { provide: 'CURRENT_USER_KEY', useValue: 'current-user' },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    DemoShopHttpService,
    AuthService,
    ProductService,
    LoggedInGuard,
    UnAuthGuard,
    ActionResultPopupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
