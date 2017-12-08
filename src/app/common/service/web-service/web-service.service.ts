import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceParams } from './web-service-params';

@Injectable()
export class WebServiceService {

  private baseUrl = 'http://localhost:3000/api/1.0';

  METHOD_LOGIN = 'login';

  constructor(private http: HttpClient) { }

  execute(payload: WebServiceParams) {
    if ((payload == null) || (payload.method == null)) {
      return null;
    }

    return this.build(payload);
  }

  build(payload: WebServiceParams) {
    let reqParams: any = null;

    if (payload.method === this.METHOD_LOGIN) {
      reqParams = {
        type: 'POST',
        body: payload.body,
        url: this.baseUrl + '/' + payload.method + '/' + this.processURLParameters(payload.urlParams)
      };
    }

    return this.trigger(reqParams);
  }

  processURLParameters(payload: JSON) {
    if (payload == null || JSON.stringify(payload).length === 2) {
      return '';
    }

    const stringified: String = '';

    debugger;
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        stringified.concat(key + '/' + payload[key]);
      }
    }
    return stringified;
  }

  trigger(reqParams: any) {
    return this.http.request(reqParams.type, reqParams.url, {
      body: reqParams.body,
      responseType: 'json',
      observe: 'response'
    })
    .subscribe(
      _response => {
        debugger;
      },
      _error => {
        debugger;
      }
    );
  }
}
