import { Component, OnInit } from '@angular/core';
import {UsersGroup} from '../../model/UsersGroups';
import {FormBuilder, Validators} from '@angular/forms';
import {UsersGroupsAdminService} from '../../services/usersGroupAdminService';
import {Router} from '@angular/router';


@Component({
  selector: 'app-users-groups-create',
  templateUrl: './users-groups-create.component.html',
  styleUrls: ['./users-groups-create.component.css']
})
export class UsersGroupsCreateComponent implements OnInit {

  usersGroup: UsersGroup;
  usersGroupForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(private api: UsersGroupsAdminService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    const usersGroup = new UsersGroup();
    this.usersGroup = usersGroup;
  }

  onSubmit() {

    this.usersGroup.name = this.usersGroupForm.controls.name.value;
    this.usersGroup.description = this.usersGroupForm.controls.description.value;

    this.api.createUsersGroup(this.usersGroup).subscribe( x => {
      this.router.navigate(['/group-user']);
    });

  }

  onGoBack() {
    this.router.navigate(['/group-user']);
  }

}
