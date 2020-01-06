import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({ templateUrl: 'logout.component.html' })


export class LogoutComponent {

  constructor( private authenticationService: AuthenticationService,
               private router: Router) {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
