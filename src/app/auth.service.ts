import { Injectable, Inject } from '@angular/core';
import { DemoShopHttpService } from './demo-shop-http.service';
import { UserModel } from './user.model';
import { LocalStorageService } from 'ngx-webstorage';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishReplay';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class AuthService {
  private _currentUser: UserModel;
  private _sessionTokenKey: string;
  private _currentUserKey: string;
  private _isUserAdministrator: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _userName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public canUserManageProducts: Observable<boolean> = this._isUserAdministrator.publishReplay(1).refCount();
  public userName: Observable<string> = this._userName.publishReplay(1).refCount();

  constructor (
    private httpService: DemoShopHttpService,
    private localSt:LocalStorageService,
    @Inject('SESSION_TOKEN_KEY') sessionTokenKey: string,
    @Inject('CURRENT_USER_KEY') currentUserKey: string) {
      this._sessionTokenKey = sessionTokenKey;
      this._currentUserKey = currentUserKey;
      let lsUser = this.localSt.retrieve(this._currentUserKey);
      if (lsUser) {
        this.setCurrentUser(lsUser)
          .subscribe();
    }
  }

  login (user: UserModel) {
    return this.httpService.post('/login', user)
      .do(res => {
        var sessionToken = res.headers.get(this._sessionTokenKey);
        this.localSt.store(this._sessionTokenKey, sessionToken);
      })
      .mergeMap(() => this.setCurrentUser(user));
  }

  logout () {
    return this.httpService.post('/logout', this._currentUser)
      .do(res => {
        this.localSt.clear(this._sessionTokenKey);
        this.localSt.clear(this._currentUserKey);
      })
      .do(res => {
        this._isUserAdministrator.next(false);
      });
  }

  isLoggedIn (): boolean {
    return this.localSt.retrieve(this._sessionTokenKey) !== null &&
        this.localSt.retrieve(this._currentUserKey) !== null;
  }

  private setCurrentUser (user: UserModel) {
    return this.httpService.get(`/users`, `login=${user.login}`)
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
      .do(() => {
        this._userName.next(this._currentUser.login);
      })
      .mergeMap(([user]) => {
        return this.httpService.get(`/roles`, `id=${user.roleId}`)
      })
      .map((response: Response) => response.text())
      .map((jsonUser: string) => JSON.parse(jsonUser))
      .do(([role]) => {
        this._currentUser.isAdministrator = role['name'] === 'Admin';
        this._isUserAdministrator.next(this._currentUser.isAdministrator);
      })
      .do(() => {
        this.localSt.store(this._currentUserKey, this._currentUser);
      })
      .share();
  }
}
