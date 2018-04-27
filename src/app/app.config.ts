import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppConfig {

    private _config: Object = null;
    private _env:    Object = null;

    constructor(private http: Http) {}

    public getConfig(key: any) {
        return this._config[key];
    }

    public getEnv(key: any) {
        return this._env[key];
    }

    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('env.json').map( res => res.json() ).catch((error: any):any => {
                console.log('Configuration file "env.json" could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe( (envResponse) => {
                this._env = envResponse;
                let request:any = null;

                switch (envResponse.env) {
                    case 'development': {
                        request = this.http.get('config.' + envResponse.env + '.json');
                    } break;

                    case 'default': {
                        console.error('Environment file is not set or invalid');
                        resolve(true);
                    } break;
                }

                if (request) {
                    request
                        .map( res => res.json() )
                        .catch((error: any) => {
                            console.error('Error reading ' + envResponse.env + ' configuration file');
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        })
                        .subscribe((responseData) => {
                            this._config = responseData;
                            resolve(true);
                        });
                } else {
                    console.error('Env config file "env.json" is not valid');
                    resolve(true);
                }
            });

        });
    }
}
