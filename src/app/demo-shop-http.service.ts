import { Injectable, Inject } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import { LocalStorageService } from 'ngx-webstorage';
import {Observable} from "rxjs";

@Injectable()
export class DemoShopHttpService {
  private envUrl: string;
  private sessionTokenName: string;

  constructor(
    private http: Http,
    private localSt:LocalStorageService,
    @Inject('ENV_URL') envUrl: string,
    @Inject('SESSION_TOKEN_KEY') sessionTokenKey: string
  ) {
    this.envUrl = envUrl;
    this.sessionTokenName = sessionTokenKey;
  }

  get (path: string, query?: string): Observable<Response> {
    var reqOpts = this.getReqOptions();
    return this.http.get(`${this.envUrl}${path}?${query}`, reqOpts);
  }

  post (path: string, body: any): Observable<Response> {
    var reqOpts = this.getReqOptions();
    return this.http.post(`${this.envUrl}${path}`,
      body, reqOpts);
  }

  put (path: string, body: any): Observable<Response> {
    body = typeof body === 'string' ? body : JSON.stringify(body);
    var reqOpts = this.getReqOptions();
    return this.http.put(`${this.envUrl}${path}`,
      body, reqOpts);
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
}
