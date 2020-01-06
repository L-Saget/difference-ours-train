import { Component, OnInit } from '@angular/core';
import {UserAdminService} from '../../services/userAdmin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/User';
import {FormBuilder} from '@angular/forms';
import { Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {AuthenticationService} from '../../services/authentication.service';
import {StoreService} from '../../services/store.service';
import {UsersGroup} from '../../model/UsersGroups';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  currentUser: User;
  usersGroupList: UsersGroup[] = [];

  userForm = this.fb.group({
    email: ['', Validators.required],
    firstName: [''],
    lastName: [''],
    phone: [''],
    enable: [''],
    userType: [''],

  });

  constructor(private api: UserAdminService,
              private store: StoreService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              public snackBar: MatSnackBar,
              private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => {this.currentUser = x; });
  }

  ngOnInit() {
    this.store.getUser().subscribe(newUser => {
      this.user = newUser;
      this.initForm();
      // get usersGroupList
      this.store.getUsersGroupList().subscribe(newUsersGroupList => {
        this.usersGroupList = newUsersGroupList;
      });
    });

    this.currentUser.id = AuthenticationService.getDecodedAccessToken(this.currentUser.token.toString()).id;
    this.currentUser.type = AuthenticationService.getDecodedAccessToken(this.currentUser.token.toString()).role;
  }

  public get isAdmin() {
    return this.currentUser && Number(this.currentUser.type) >= 2;
  }

  public get isSelfUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.currentUser && Number(this.currentUser.id) === id;
  }

  public get isAuthorized() {
    return (this.isSelfUser || this.isAdmin);
  }

  initForm() {
    this.userForm.setValue({
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phone: this.user.phone,
      enable: this.user.enable,
      userType: this.user.type,
    });
  }

  onSubmit() {
    this.user.email = this.userForm.controls.email.value;
    this.user.firstName = this.userForm.controls.firstName.value;
    this.user.lastName = this.userForm.controls.lastName.value;
    this.user.phone = this.userForm.controls.phone.value;
    this.user.enable = this.userForm.controls.enable.value;
    this.user.type = this.userForm.controls.userType.value;

    this.api.updateUser(this.user.id, this.user).subscribe( x => {
      this.router.navigate(['/users']);
    });
  }

  onDelete() {
    this.api.deleteAssociationByUserId(this.user.id).subscribe();
    this.api.deleteUser(this.user.id).subscribe( x => {
      this.router.navigate(['/users']);
    });
  }

  onDisconnect() {
    this.api.ResetUser(this.user.id).subscribe(
      (data) => {
        this.snackBar.open('Utilisateur : \'' +
          this.user.firstName.toString() + ' ' +
          this.user.lastName.toString() + '\' déconnecté...',  'X');
      },
      (error) => {
        this.snackBar.open('Erreur serveur...',  'X');
      } );
  }
}
