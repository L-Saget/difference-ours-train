import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../services/store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersGroupsAdminService} from '../../services/usersGroupAdminService';
import {UsersGroup} from '../../model/UsersGroups';

@Component({
  selector: 'app-users-groups-screen',
  templateUrl: './users-groups-screen.component.html',
  styleUrls: ['./users-groups-screen.component.css']
})
export class UsersGroupsScreenComponent implements OnInit {

  public usersGroup: UsersGroup;
  constructor(private store: StoreService, private api: UsersGroupsAdminService, private route: ActivatedRoute, private router: Router, )  {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.api.getUsersGroupById(id).subscribe(usersGroup => {
      this.usersGroup = usersGroup;
      this.store.setUsersGroup(this.usersGroup);
    });
  }

  onGoBack() {
    this.router.navigate(['/group-user']);
  }
}
