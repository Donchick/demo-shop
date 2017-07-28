import { Injectable, Inject } from '@angular/core';
import { DemoShopHttpService } from './demo-shop-http.service';
import { UserModel } from './user.model';
import { LocalStorageService } from 'ngx-webstorage';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class AuthService {private _currentUser: UserModel;
  private _sessionTokenKey: string;
  private _isUserAdministrator: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  public canUserManageProducts: Observable<boolean> = this._isUserAdministrator.asObservable();

  constructor( private httpService: DemoShopHttpService,
              private localSt:LocalStorageService,
              @Inject('SESSION_TOKEN_KEY') sessionTokenKey: string ) {
    this._sessionTokenKey = sessionTokenKey;
    this._currentUser = null;
  }

  login (user: UserModel) {
    return this.httpService.post('/login', user)
      .do(res => {
        var sessionToken = res.headers.get(this._sessionTokenKey);
        this.localSt.store(this._sessionTokenKey, sessionToken);
      })
      .mergeMap(() => this.setCurrentUser(user));
  }

  logout (user: UserModel) {
    this.httpService.post('/logout', user)
      .do(res => {
        this.localSt.clear(this._sessionTokenKey);
      })
      .do(res => {
        this._isUserAdministrator.next(false);
      });
  }

  private setCurrentUser (user: UserModel) {
    var userCredentialsObserver = this.httpService.get(`/users?login=${user.login}`)
      .map((response: Response) => response.text())
      .map((jsonUser: string) => JSON.parse(jsonUser))
      .do(([user]) => {
        this._currentUser = new UserModel(
          user.login,
          user.password,
          user.id,
          user.roleId
        );
      })
      .mergeMap(([user]) => {
        return this.httpService.get(`/roles?id=${user.roleId}`)
      })
      .map((response: Response) => response.text())
      .map((jsonUser: string) => JSON.parse(jsonUser))
      .do(([role]) => {
        this._currentUser.isAdministrator = role['name'] === 'Admin';
        this._isUserAdministrator.next(this._currentUser.isAdministrator);
      });

    return userCredentialsObserver;
  }
}
