import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {StoreService} from '../../services/store.service';
import {Group} from '../../model/Groups';
import {UserAdminService} from '../../services/userAdmin.service';
import {UsersGroupsAdminService} from '../../services/usersGroupAdminService';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User ;
  usersGroupList: Group[] = [];
  // userGroup: string;
  constructor(private store: StoreService,
              private apiUser: UserAdminService,
              private apiUsersGroup: UsersGroupsAdminService
  ) { }
  ngOnInit() {
    this.store.getUser().subscribe(newUser => {
        this.user = newUser;
      // get usersGroupID of the user
      this.apiUser.getUserGroupById(this.user.id).subscribe(userGroup => {
        // get name and id of the UsersGroup
        for (let i = 0; i <= Object.keys(userGroup).length - 1 ; i++) {
          this.apiUsersGroup.getUsersGroupById(parseInt(userGroup[i].userGroupId, 10)).subscribe(usersGroup => {
            this.usersGroupList[i] = usersGroup;
            this.store.setUsersGroupList(this.usersGroupList);
          });
        }
      });
    });
  }
}
