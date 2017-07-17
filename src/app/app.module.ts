import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DemoShopHttpService } from './demo-shop-http.service';
import { AuthService } from './auth.service';
import {Ng2Webstorage} from 'ngx-webstorage';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2Webstorage
  ],
  providers: [
    { provide: 'ENV_URL', useValue: 'http://localhost:3000/api' },
    { provide: 'SESSION_TOKEN_KEY', useValue: 'session-token' },
    DemoShopHttpService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
