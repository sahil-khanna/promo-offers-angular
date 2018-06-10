import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsService {

	public token: String;
	public showLoading: Boolean = false;
	public selectedTabId: Number;

	constructor() { }

}
