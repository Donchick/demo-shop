import { Injectable, Inject } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import { LocalStorageService } from 'ngx-webstorage';
import { ActionResultPopupService } from './action-result-popup.service'
import {Observable} from "rxjs";

@Injectable()
export class DemoShopHttpService {
  private envUrl: string;
  private sessionTokenName: string;

  constructor(
    private http: Http,
    private localSt:LocalStorageService,
    private _popupService: ActionResultPopupService,
    @Inject('ENV_URL') envUrl: string,
    @Inject('SESSION_TOKEN_KEY') sessionTokenKey: string
  ) {
    this.envUrl = envUrl;
    this.sessionTokenName = sessionTokenKey;
  }

  get (path: string, query?: string): Observable<Response> {
    var reqOpts = this.getReqOptions();
    return this.http.get(`${this.envUrl}${path}?${query}`, reqOpts)
      .catch(this._handleError.bind(this));
  }

  post (path: string, body: any): Observable<Response> {
    var reqOpts = this.getReqOptions();
    return this.http.post(`${this.envUrl}${path}`,
      body, reqOpts)
      .catch(this._handleError.bind(this));
  }

  put (path: string, body: any): Observable<Response> {
    body = typeof body === 'string' ? body : JSON.stringify(body);
    var reqOpts = this.getReqOptions();
    return this.http.put(`${this.envUrl}${path}`,
      body, reqOpts)
      .catch(this._handleError.bind(this));
  }

  deleteProduct (path: string) {
    var reqOpts = this.getReqOptions();
    return this.http.delete(`${this.envUrl}${path}`, reqOpts);
  }

  private getReqOptions (): RequestOptions {
    var reqOpts = new RequestOptions();
    var headers = new Headers();
    var sessionToken = this.localSt.retrieve(this.sessionTokenName);
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
