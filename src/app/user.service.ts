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
      .map((response: Response) => response.text())
      .map((jsonUser: string) => JSON.parse(jsonUser))
      .do(user => {
        this.currentUser = new UserModel(
          user.login,
          user.password,
          user.userId,
          user.userRoleId
        );

        return user.userRoleId;
      })
      .do((userRoleId: number) => {
        return this.demoShopHttpService.get(`/roles?id=${userRoleId}`);
      })
      .map(response => {
        return response.text()
      })
      .map(jsonRole => JSON.parse(jsonRole))
      .subscribe(role => {
        this.currentUser.isAdministrator = role['name'] === 'Admin';
      })
  }
}
