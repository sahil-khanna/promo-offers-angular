interface WebServiceParams {
  method: 'login' | 'register';
  body?: any;
  urlParams?: any;
  priority: 'high' | 'low';
  loadingMessage?: string;
  callback: Function;
}

interface RequestParams {
  type: 'POST' | 'GET' | 'PUT' | 'DELETE';
  body?: any;
  url?: string;
}

interface RespoonseMessage {
  code: Number;
  message?: string;
  data?: any;
}

interface CurrentlyExecuting {
  payload: WebServiceParams;
  request?: Subscription;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Utils } from '../utils.service';
import { Constants } from '../../constants';

@Injectable()
export class WebServiceService {

  private baseUrl = 'http://localhost:3000/api/1.0';
  private highPriorityQueue: WebServiceParams[] = [];
  private lowPriorityQueue: WebServiceParams[] = [];
  private callback: Function = null;
  private currentlyExecuting: CurrentlyExecuting = null;

  constructor(private http: HttpClient, private utils: Utils) { }

  public execute(payload: WebServiceParams) {
    if (payload == null) {
      return;
    }

    this.callback = payload.callback;

    if (payload.priority === 'high') {
      this.highPriorityQueue.push(payload);
    } else {
      this.lowPriorityQueue.push(payload);
    }

    this.processNext();
  }

  private processNext() {
    if (this.currentlyExecuting === null) {
      // No request is currently executing
    } else if (this.currentlyExecuting.payload.priority === 'high') { // High priority request is currently executing. Let it execute
      return;
    // tslint:disable-next-line:max-line-length
    } else if (this.currentlyExecuting.payload.priority === 'low' && this.highPriorityQueue.length > 0) { // Low priority request is currently executing, but there is a high priority request pending.
      this.currentlyExecuting.request.unsubscribe();
    } else if (this.currentlyExecuting.payload.priority === 'low') {
        return;
    }

    let payload: WebServiceParams;
    if (this.highPriorityQueue.length > 0) {   // Execute items in highPriorityQueue
      payload = this.highPriorityQueue[0];
    } else if (this.lowPriorityQueue.length > 0) {   // Execute items in lowPriorityQueue
      payload = this.lowPriorityQueue[0];
    } else {   // No Request Pending
      return;
    }

    if (payload.loadingMessage != null) {
      this.utils.showLoadingIndicator(true);
    }

    this.currentlyExecuting = {payload: payload};
    this.buildRequest(payload);
  }

  private buildRequest(payload: WebServiceParams) {
    let reqParams: RequestParams = null;

    if (payload.method === 'login') {
      reqParams = {
        type: 'POST',
        body: payload.body,
        url: this.baseUrl + '/' + payload.method + '/' + this.processURLParameters(payload.urlParams)
      };
    } else if (payload.method === 'register') {
      reqParams = {
        type: 'POST',
        body: payload.body,
        url: this.baseUrl + '/' + payload.method + '/' + this.processURLParameters(payload.urlParams)
      };
    }

    this.triggerRequest(reqParams);
  }

  private processURLParameters(payload: JSON): String {
    if (payload == null || JSON.stringify(payload).length === 2) {
      return '';
    }

    const stringified: String = '';
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        stringified.concat(key + '/' + payload[key]);
      }
    }

    return stringified;
  }

  private triggerRequest(reqParams: RequestParams) {
    const onComplete = (_response: RespoonseMessage) => {
      if (this.currentlyExecuting.request) {
        this.currentlyExecuting.request.unsubscribe();
      }
      this.callback(_response);

      if (this.currentlyExecuting.payload.loadingMessage != null) {
        this.utils.showLoadingIndicator(false);
      }

      // Remove item from appropriate queue
      if (this.currentlyExecuting.payload.priority === 'high') {
          this.highPriorityQueue.splice(0, 1);
      } else {
        this.lowPriorityQueue.splice(0, 1);
      }

      this.currentlyExecuting = null;
      this.processNext();
    };

    this.currentlyExecuting.request = this.http.request(reqParams.type, reqParams.url, {
      body: reqParams.body,
      responseType: 'json',
      observe: 'response'
    }).subscribe(
      (_response: any) => {
        onComplete(_response.body);
      },
      _error => {
        onComplete({
          code: -1,
          message: Constants.WEBSERVICE_INTERNET_NOT_CONNNECTED
        });
      }
    );
  }
}
