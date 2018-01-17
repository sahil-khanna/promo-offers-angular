// Ref: https://medium.com/@gerasimov.pk/how-to-reuse-rendered-component-in-angular-2-3-with-routereusestrategy-64628e1ca3eb

import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';
import { LoginComponent } from './login/login.component';

export class CustomReuseStrategy implements RouteReuseStrategy {

    private handlers: {[key: string]: DetachedRouteHandle} = {};

    constructor() { }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return (route.routeConfig['reuseComponent'] === true);
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.handlers[route.url.join('/') || route.parent.url.join('/')] = handle;
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        if (route.component === LoginComponent) {
            this.handlers = {};
        }

        return !!this.handlers[route.url.toString()];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        return this.handlers[route.url.join('/') || route.parent.url.join('/')];
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}
