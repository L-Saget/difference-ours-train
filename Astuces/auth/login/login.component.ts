import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
import {NgxPermissionsService} from 'ngx-permissions';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/User';



@Component({
  selector: 'app-auth-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    user: User;
    currentUser: User;


    email = new FormControl('', [Validators.required, Validators.email]);

    getErrorMessage() {
      return this.email.hasError('required') ? 'Email is required' :
        this.email.hasError('email') ? 'Not a valid email' :
          '';
    }

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private permissionsService: NgxPermissionsService,
    ) {


    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }




  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  // TODO : debug only
                  this.permissionsService.permissions$.subscribe((permissions) => {
                    console.log("-----------permissions LOGIN");
                    console.table(permissions);
                  });

                  //  TODO : is this the right place ? or in ngOnInit ?
                  this.authenticationService.currentUser.subscribe(x => {
                    this.currentUser = x;
                  });

                  this.currentUser.id = AuthenticationService.getDecodedAccessToken(this.currentUser.token.toString()).id;
                  this.currentUser.type = AuthenticationService.getDecodedAccessToken(this.currentUser.token.toString()).role;

                  if (this.isSuperAdmin) {
                    this.permissionsService.addPermission('SUPERADMIN');
                    this.permissionsService.addPermission('ADMIN');
                    this.permissionsService.addPermission('USER');
                    this.permissionsService.addPermission('MANAGER');
                  }
                  if (this.isAdmin) {
                    this.permissionsService.addPermission('ADMIN');
                    this.permissionsService.addPermission('USER');
                    this.permissionsService.addPermission('MANAGER');
                  }
                  if (this.isManager) {
                    this.permissionsService.addPermission('USER');
                    this.permissionsService.addPermission('MANAGER');
                  }
                  if (this.isUser) {
                    this.permissionsService.addPermission('MANAGER');
                  }

                  this.permissionsService.addPermission('NOTHING');
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

  public get isSuperAdmin() {
    return this.currentUser && Number(this.currentUser.type) === 3;
  }
  public get isAdmin() {
    return this.currentUser && Number(this.currentUser.type) === 2;
  }
  public get isManager() {
    return this.currentUser && Number(this.currentUser.type) === 1;
  }
  public get isUser() {
    return this.currentUser && Number(this.currentUser.type) === 0;
  }
}
