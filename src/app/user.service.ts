import { Injectable } from '@angular/core';
import {UserModel} from "./user.model";
import {DemoShopHttpService} from "./demo-shop-http.service";
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class UserService {
  private currentUser: UserModel;

  constructor(
    private demoShopHttpService: DemoShopHttpService
  ) { }

  public setCurrentUser(user: UserModel) {
    this.demoShopHttpService.get(`/users?login=${user.login}`)
      .map((response: Response) => {
        return response.text()
      })
      .map((jsonUser: string) => JSON.parse(jsonUser))
      .do(([user]) => {
        this.currentUser = new UserModel(
          user.login,
          user.password,
          user.id,
          user.roleId
        );
      })
      .mergeMap(([user]) => {
        return this.demoShopHttpService.get(`/roles?id=${user.roleId}`)
      })
      .map(response => response.text())
      .map(jsonRole => JSON.parse(jsonRole))
      .subscribe(([role]) => {
        this.currentUser.isAdministrator = role['name'] === 'Admin';
      })
  }

  public isUserAdmin() {
    return this.currentUser.isAdministrator;
  }
}
