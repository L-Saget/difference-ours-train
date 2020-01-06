import { Component, OnInit } from '@angular/core';
import {UsersGroup} from '../../model/UsersGroups';
import {User} from '../../model/User';
import {StoreService} from '../../services/store.service';
import {UsersGroupsAdminService} from '../../services/usersGroupAdminService';
import {UserAdminService} from '../../services/userAdmin.service';

@Component({
  selector: 'app-users-groups-details',
  templateUrl: './users-groups-details.component.html',
  styleUrls: ['./users-groups-details.component.css']
})
export class UsersGroupsDetailsComponent implements OnInit {

  usersGroup: UsersGroup;
  userList: User[] = [];

  constructor(private store: StoreService, private api: UsersGroupsAdminService, private apiDevice: UserAdminService) { }

  ngOnInit() {
    // get Group
    this.store.getUsersGroup().subscribe(newGroup => {
      this.usersGroup = newGroup;
      // get deviceID of the group
      this.api.getUsersByUsersGroupId(this.usersGroup.id).subscribe(users => {
        // get name and id of the group // TODO : change this with associate table
        for (let i = 0; i <= Object.keys(users).length - 1 ; i++) {
          this.apiDevice.getUserById(parseInt(users[i].userId, 10)).subscribe(user => {
            this.userList[i] = user;
            this.store.setUserList(this.userList);
          });
        }
      });
    });
  }
}
