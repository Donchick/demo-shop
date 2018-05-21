import { Injectable, Inject } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import { LocalStorageService } from 'ngx-webstorage';
import { ActionResultPopupService } from '../action-result-popup/action-result-popup.service'
import {Observable} from "rxjs";
import { AppConfig } from './../../app.config';

@Injectable()
export class DemoShopHttpService {
  private envUrl: string;
  private sessionTokenName: string;

  constructor(
    private http: Http,
    private localSt:LocalStorageService,
    private _popupService: ActionResultPopupService,
    private _appConfig: AppConfig,
    @Inject('SESSION_TOKEN_KEY') sessionTokenKey: string
  ) {
    this.envUrl = this._appConfig.getConfig('env_url');
    this.sessionTokenName = sessionTokenKey;
  }

  makeGetRequest (path: string, query?: string): Observable<any> {
    const reqOpts = this.getReqOptions();
    return this.http.get(`${this.envUrl}${path}?${query}`, reqOpts)
      .catch(this._handleError.bind(this));
  }

  makePostRequest (path: string, body: any): Observable<any> {
    const reqOpts = this.getReqOptions();
    return this.http.post(`${this.envUrl}${path}`,
      body, reqOpts)
      .catch(this._handleError.bind(this));
  }

  makePutRequest (path: string, body: any): Observable<any> {
    const parsedBody = typeof body === 'string' ? body : JSON.stringify(body);
    const reqOpts = this.getReqOptions();
    return this.http.put(`${this.envUrl}${path}`,
      parsedBody, reqOpts)
      .catch(this._handleError.bind(this));
  }

  deleteProduct (path: string) {
    const reqOpts = this.getReqOptions();
    return this.http.delete(`${this.envUrl}${path}`, reqOpts);
  }

  private getReqOptions (): RequestOptions {
    const reqOpts = new RequestOptions();
    const headers = new Headers();
    const sessionToken = this.localSt.retrieve(this.sessionTokenName);
    if (sessionToken) {
      headers.append(this.sessionTokenName, sessionToken);
    }
    headers.append('Content-Type', 'application/json');
    reqOpts.headers = headers;
    return reqOpts;
  }

  private _handleError (err: any, caught) {
    if (err.status >= 500 && err.status < 600) {
      this._popupService.actionReject(err.msg);
      return Observable.empty();
    } else {
      return Observable.throw(err);
    }
  }
}
