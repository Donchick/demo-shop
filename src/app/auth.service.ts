import { Injectable, Inject } from '@angular/core';
import { DemoShopHttpService } from './demo-shop-http.service';
import { UserModel } from './user.model';
import { LocalStorageService } from 'ngx-webstorage';
import {Response} from "@angular/http";
import {Observable, Subscription} from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {UserService} from "./user.service";

@Injectable()
export class AuthService {
  sessionTokenKey: string;

  constructor( private httpService: DemoShopHttpService,
              private localSt:LocalStorageService,
              private userService: UserService,
              @Inject('SESSION_TOKEN_KEY') sessionTokenKey: string ) {
    this.sessionTokenKey = sessionTokenKey;
  }

  login (user: UserModel) {
    return this.httpService.post('/login', user)
      .do(res => {
        var sessionToken = res.headers.get(this.sessionTokenKey);
        this.localSt.store(this.sessionTokenKey, sessionToken);
      })
      .mergeMap(res => {
        return this.userService.setCurrentUser(user);
      });
  }

  logout (user: UserModel) {
    this.httpService.post('/logout', user)
      .do(res => {
        this.localSt.clear(this.sessionTokenKey);
      });
  }
}
