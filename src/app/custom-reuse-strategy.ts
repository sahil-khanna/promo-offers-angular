// Ref: https://medium.com/@gerasimov.pk/how-to-reuse-rendered-component-in-angular-2-3-with-routereusestrategy-64628e1ca3eb

import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';

export class CustomReuseStrategy implements RouteReuseStrategy {

	private handlers: { [key: string]: DetachedRouteHandle } = {};

	constructor() { }

	/**
     * Determines if this route (and its subtree) should be detached to be reused later.
     */
	shouldDetach(route: ActivatedRouteSnapshot): boolean {
		return (route.routeConfig['reuseComponent'] === true);
	}

	/**
     * Stores the detached route.
     */
	store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
		this.handlers[route.url.join('/') || route.parent.url.join('/')] = handle;
	}

	/**
     * Determines if this route (and its subtree) should be reattached.
     */
	shouldAttach(route: ActivatedRouteSnapshot): boolean {
		if (route.component === LoginComponent) {
			this.handlers = {};
		}
		return !!this.handlers[route.url.toString()];
	}

	/**
     * Retrieves the previously stored route.
     */
	retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
		return this.handlers[route.url.join('/') || route.parent.url.join('/')];
	}

	/**
     * Determines if a route should be reused.
     */
	shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
		return future.routeConfig === curr.routeConfig;
	}
}
