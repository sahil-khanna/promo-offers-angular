interface WebServiceParams {
  method: string;
  body?: any;
  urlParams?: any;
  priority: 'high' | 'low';
  loadingMessage?: string;
}

interface RequestParams {
  type: 'POST' | 'GET' | 'PUT' | 'DELETE';
  body?: any;
  url?: string;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class WebServiceService {

  private baseUrl = 'http://localhost:3000/api/1.0';
  private highPriorityQueue: WebServiceParams[] = [];
  private lowPriorityQueue: WebServiceParams[] = [];
  private isExecuting: Boolean = false;

  METHOD_LOGIN = 'login';

  constructor(private http: HttpClient) { }

  execute(payload: WebServiceParams) {
    if ((payload == null)) {
      return null;
    }

    if (payload.priority === 'high') {
      this.highPriorityQueue.push(payload);
    } else {
      this.lowPriorityQueue.push(payload);
    }

    return this.processNext();
  }

  private processNext() {
    if (this.isExecuting) {    // Some request is currently being executed
      return;
    }

    let payload: WebServiceParams;
    if (this.highPriorityQueue.length > 0) {   // Execute items in highPriorityQueue
      payload = this.highPriorityQueue[0];
    } else if (this.lowPriorityQueue.length > 0) {   // Execute items in lowPriorityQueue
      payload = this.lowPriorityQueue[0];
    } else {
      return;
    }

    this.isExecuting = true;

    if (payload.loadingMessage != null) {
        // TODO: Show loading indicator with message
    }

    return this.buildRequest(payload);
  }

  private buildRequest(payload: WebServiceParams) {
    let reqParams: RequestParams = null;

    if (payload.method === this.METHOD_LOGIN) {
      reqParams = {
        type: 'POST',
        body: payload.body,
        url: this.baseUrl + '/' + payload.method + '/' + this.processURLParameters(payload.urlParams)
      };
    }

    return this.triggerRequest(reqParams);
  }

  private processURLParameters(payload: JSON) {
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

  private triggerRequest(reqParams: RequestParams) {
    debugger;
    return this.http.request(reqParams.type, reqParams.url, {
      body: reqParams.body,
      responseType: 'json',
      observe: 'response'
    }).do(
      _next => {
        // this.processNext();
      },
      _error => {
        // this.processNext();
      }
    );
    // .do(
    //   _next => {
    //     this.processNext();
    //   },
    //   _error => {
    //     this.processNext();
    //   }
    // );
    // .subscribe(
    //   _response => {
    //     debugger;
    //     return {code: 0};
    //   },
    //   _error => {
    //     debugger;
    //     return {code: -1};
    //   }
    // );
  }
}
