interface WebServiceParams {
	method: 'login' | 'register' | 'activate-account' | 'forgot-password' |
	'reset-password' | 'logout' | 'profile' | 'contribute' | 'contributions'|
	'vendors' | 'create-vendor' | 'update-vendor' | 'delete-vendor' |
	'offers' | 'create-offer' | 'update-offer' | 'delete-offer';
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
	message?: String;
	data?: any;
}

interface CurrentlyExecuting {
	payload: WebServiceParams;
	request?: Subscription;
}

import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Utils } from './utils.service';
import { StorageService } from './storage.service';
import { ConstantsService } from './constants.service';

@Injectable()
export class WebServiceService {

	private baseUrl = 'http://localhost:3000/api/1.0';
	private highPriorityQueue: WebServiceParams[] = [];
	private lowPriorityQueue: WebServiceParams[] = [];
	private callback: Function = null;
	private currentlyExecuting: CurrentlyExecuting = null;

	private utils: Utils;
	private storage: StorageService;

	constructor(
		private injector: Injector,
		private http: HttpClient,
		private constants: ConstantsService
	) {
		const $this = this;
		setTimeout(() => {
			$this.utils = $this.injector.get(Utils);
			$this.storage = $this.injector.get(StorageService);
		});
	}

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

	public clear() {
		if (this.currentlyExecuting) {
			this.currentlyExecuting.request.unsubscribe();
			this.currentlyExecuting = null;
		}

		this.highPriorityQueue = [];
		this.lowPriorityQueue = [];
	}

	private processNext() {
		if (!this.utils) {  // In a few cases, utils wasn't initialized. So processing after a delay
			const $this = this;
			setTimeout(() => {
				$this.processNext();
			});
			return;
		}

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

		this.currentlyExecuting = { payload: payload };
		this.buildRequest(payload);
	}

	private buildRequest(payload: WebServiceParams) {
		let reqParams: RequestParams = null;

		switch (payload.method) {
			case 'login':
			case 'register':
			case 'contribute': {
				reqParams = {
					type: 'POST',
					body: payload.body,
					url: this.baseUrl + '/' + payload.method + '/' + this.processURLParameters(payload.urlParams)
				};
				break;
			}
			case 'logout':
			case 'activate-account':
			case 'forgot-password':
			case 'contributions':
			case 'vendors':
			case 'offers': {
				reqParams = {
					type: 'GET',
					url: this.baseUrl + '/' + payload.method + '/' + this.processURLParameters(payload.urlParams)
				};
				break;
			}
			case 'profile':
			case 'reset-password': {
				reqParams = {
					type: 'PUT',
					body: payload.body,
					url: this.baseUrl + '/' + payload.method + '/' + this.processURLParameters(payload.urlParams)
				};
				break;
			}
			case 'create-vendor': {
				reqParams = {
					type: 'POST',
					body: payload.body,
					url: this.baseUrl + '/' + 'vendors' + '/' + this.processURLParameters(payload.urlParams)
				};
				break;
			}
			case 'update-vendor': {
				reqParams = {
					type: 'PUT',
					body: payload.body,
					url: this.baseUrl + '/' + 'vendors' + '/' + this.processURLParameters(payload.urlParams)
				};
				break;
			}
			case 'delete-vendor': {
				reqParams = {
					type: 'DELETE',
					url: this.baseUrl + '/' + 'vendors' + '/' + this.processURLParameters(payload.urlParams)
				};
				break;
			}
			case 'create-offer': {
				reqParams = {
					type: 'POST',
					body: payload.body,
					url: this.baseUrl + '/' + 'offers' + '/' + this.processURLParameters(payload.urlParams)
				};
				break;
			}
			case 'update-offer': {
				reqParams = {
					type: 'PUT',
					body: payload.body,
					url: this.baseUrl + '/' + 'offers' + '/' + this.processURLParameters(payload.urlParams)
				};
				break;
			}
			case 'delete-offer': {
				reqParams = {
					type: 'DELETE',
					url: this.baseUrl + '/' + 'offers' + '/' + this.processURLParameters(payload.urlParams)
				};
				break;
			}

			default:
				break;
		}

		if (reqParams) {
			this.triggerRequest(reqParams);
		}
	}

	private processURLParameters(payload: JSON): String {
		if (payload == null || JSON.stringify(payload).length === 2) {
			return '';
		}

		let stringified: String = '';
		for (const key in payload) {
			if (payload.hasOwnProperty(key)) {
				stringified += key + '/' + payload[key] + '/';
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
			headers: {
				'x-token': this.utils.nullToObject(this.storage.getDataForKey(this.constants.TOKEN), '')
			},
			observe: 'response'
		}).subscribe(
			(_response: any) => {
				const newToken = _response.headers.get('x-token');
				if (newToken) {
					this.storage.setDataForKey(this.constants.TOKEN, newToken);
				}
				onComplete(_response.body);
			},
			_error => {
				onComplete({
					code: -1,
					message: this.constants.WEBSERVICE_INTERNET_NOT_CONNNECTED
				});
			}
		);
	}
}
