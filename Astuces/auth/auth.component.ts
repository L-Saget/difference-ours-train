import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../model/User';
import {AuthenticationService} from '../services/authentication.service';



@Component({ selector: 'app-auth', templateUrl: 'auth.component.html'})

export class AuthComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }


}
