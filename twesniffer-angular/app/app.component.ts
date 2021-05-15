import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {NavBarComponent}   from './shared/navbar.component';
import {HomeComponent}     from './home/home.component';

@RouteConfig([
	{ path: '/',          name: 'Home',     component: HomeComponent }
])
@Component({
    selector: 'my-app',
    template: `
        <navbar></navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [NavBarComponent, ROUTER_DIRECTIVES]
})
export class AppComponent { }