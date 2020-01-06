import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserAdminService} from '../../services/userAdmin.service';
import {UsersGroupsAdminService} from '../../services/usersGroupAdminService';
import {User} from '../../model/User';

@Component({
  selector: 'app-users-groups-associate',
  templateUrl: './users-groups-associate.component.html',
  styleUrls: ['./users-groups-associate.component.css']
})
export class UsersGroupsAssociateComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiUser: UserAdminService,
              private apiUsersGroup: UsersGroupsAdminService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  id: number;
  usersList: User[] = [];
  usersIdList: number[] = [];
  displayedColumns = ['checked', 'id', 'firstname', 'lastname'];
  dataSource: MatTableDataSource<User>;
  usersGroupName: string;


  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.id = id;

    // tous les devices
    this.apiUser.getUserList().subscribe(users => {
      for (let i = 0; i <= Object.keys(users).length - 1 ; i++) {
        // un seul device a la fois
        this.apiUser.getUserById(users[i].id).subscribe(user => {

          // get groupID of the device
          this.apiUser.getUserGroupById(user.id).subscribe(userGroup => {
            // TODO : get device last measure.
            // get name and id of the group
            for (let j = 0; j <= Object.keys(userGroup).length - 1 ; j++) {
              this.apiUsersGroup.getUsersGroupById(parseInt(userGroup[j].userGroupId, 10)).subscribe(UserGroup => {
                if (UserGroup.id === this.id) {
                  this.usersGroupName = UserGroup.name;
                  users[i].checked = true;
                }
              });
            }
          });
        });

        if (users[i].checked === undefined) {
          users[i].checked = false;
        }
      }


      this.usersList = users;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onConfirm() {
    for (let j = 0; j <= Object.keys(this.usersList).length - 1 ; j++) {
      if (this.usersList[j].checked) {
        this.usersIdList[j] = this.usersList[j].id;
      }
    }
    this.apiUsersGroup.deleteAssociationByUsersGroupId(this.id).subscribe(data => {
      this.apiUsersGroup.AssociateUsersToUsersGroupByUsersGroupId(this.id, this.usersIdList).subscribe(data2 => {
        this.router.navigate(['/group-user/id/' + this.id]);
      });
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

