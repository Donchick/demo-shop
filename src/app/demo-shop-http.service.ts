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

  get (path: string, query: string) {
    var reqOpts = this.getReqOptions();
    console.log('get request');
  }

  post (path: string, body: any): Observable<Response> {
    var reqOpts = this.getReqOptions();
    return this.http.post(`${this.envUrl}${path}`,
      body, reqOpts);
  }

  put (path: string, body: any) {
    var reqOpts = this.getReqOptions();
    console.log('put request');
  }

  delete (path: string, body: any) {
    var reqOpts = this.getReqOptions();
    console.log('delete request');
  }

  private getReqOptions (): RequestOptions {
    var reqOpts = new RequestOptions();
    var headers = new Headers();
    var sessionToken = this.localSt.retrieve(this.sessionTokenName);
    if (sessionToken) {
      headers.append(this.sessionTokenName, sessionToken);
    }
    reqOpts.headers = headers;
    return reqOpts;
  }
}
