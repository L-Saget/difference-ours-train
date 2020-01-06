import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';
import {Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {UserAdminService} from '../../services/userAdmin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User;
userForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    firstName: [''],
    lastName: [''],
    phone: [''],
    enable: [''],
    userType: ['', Validators.required],

  });

  constructor(private api: UserAdminService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    const user = new User();
    this.user = user;
  }


  onSubmit() {

    this.user.email = this.userForm.controls.email.value;
    this.user.password = this.userForm.controls.password.value;
    this.user.firstName = this.userForm.controls.firstName.value;
    this.user.lastName = this.userForm.controls.lastName.value;
    this.user.phone = this.userForm.controls.phone.value;
    this.user.enable = this.userForm.controls.enable.value;
    this.user.type = this.userForm.controls.userType.value;

    this.api.createUser(this.user).subscribe( x => {
      this.router.navigate(['/users']);
    });
  }

  onGoBack() {
    this.router.navigate(['/users']);
  }

}
