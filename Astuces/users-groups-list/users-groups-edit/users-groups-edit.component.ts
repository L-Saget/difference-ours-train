import { Component, OnInit } from '@angular/core';
import {UsersGroup} from '../../model/UsersGroups';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UsersGroupsAdminService} from '../../services/usersGroupAdminService';
import {UserAdminService} from '../../services/userAdmin.service';
import {StoreService} from '../../services/store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/User';

@Component({
  selector: 'app-users-groups-edit',
  templateUrl: './users-groups-edit.component.html',
  styleUrls: ['./users-groups-edit.component.css']
})
export class UsersGroupsEditComponent implements OnInit {

  usersGroup: UsersGroup;
  users = new FormControl();
  userList: User[] = [];

  usersGroupForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(private api: UsersGroupsAdminService,
              private store: StoreService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private apiUser: UserAdminService,
  ) {}

  ngOnInit() {
    this.store.getUsersGroup().subscribe(newGroup => {
      this.usersGroup = newGroup;
      this.initForm();
      // get userList
      this.store.getUserList().subscribe(newUserList => {
        this.userList = newUserList;
      });
    });
  }

  initForm() {
    this.usersGroupForm.setValue({
      name: this.usersGroup.name,
      description: this.usersGroup.description,
    });
  }

  onSubmit() {
    this.usersGroup.name = this.usersGroupForm.controls.name.value;
    this.usersGroup.description = this.usersGroupForm.controls.description.value;

    this.api.updateUsersGroup(this.usersGroup.id, this.usersGroup).subscribe(x => {
      this.router.navigate(['/group-user']);
    });
  }

  onDelete() {

    this.api.deleteAssociationByUsersGroupId(this.usersGroup.id).subscribe();
    this.api.deleteUsersGroup(this.usersGroup.id).subscribe(x => {
      this.router.navigate(['/group-user']);
    });
  }

  onAssociate() {
    this.router.navigate(['/group-user/associate/' + Number(this.route.snapshot.paramMap.get('id'))]);
  }
}
