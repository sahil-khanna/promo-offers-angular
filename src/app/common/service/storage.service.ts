import { Injectable, Injector } from '@angular/core';
import { Utils } from './utils.service';


@Injectable()
export class StorageService {

	private utils: Utils;

	constructor(private injector: Injector) {
		const $this = this;
		setTimeout(() => {
			$this.utils = $this.injector.get(Utils);
		});
	}

	private encode(value: any) {
		if (value == null || value.length === 0) {
			return '';
		}

		return window.btoa(value);
	}

	private decode(value: any) {
		if (value == null || value.length === 0) {
			return null;
		}

		return window.atob(value);
	}

	/*
	 *  Remove key from Storage
	 */
	public remove(key: string) {
		localStorage.removeItem(this.encode(key));
	}

	/*
	 *  Getter method for LocalStorage
	 */
	public getDataForKey(key: string): any {
		let data = this.decode(localStorage.getItem(this.encode(key)));

		try {
			data = JSON.parse(data);        // is Object
		} catch (e) {
			// Do Nothing. not an object
		}

		return data;
	}

	/*
	 *  Setter method for LocalStorage
	 */
	public setDataForKey(key: string, data: any) {
		if (data == null) {
			return;
		} else if (typeof data === 'number' || typeof data === 'boolean' || typeof data === 'string') {
			// Do nothing
		} else if (typeof data === 'object') {
			data = JSON.stringify(data);
		}

		localStorage.setItem(this.encode(key), this.encode(data));
	}

	/*
	 * Clear items from localstorage except the keys provided
	 */
	public clearData(keys?: Array<string>) {
		const data = {};
		keys = this.utils.nullToObject(keys, []);

		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			data[key] = this.getDataForKey(key);
		}

		localStorage.clear();

		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			this.setDataForKey(key, data[key]);
		}
	}
}
