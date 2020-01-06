import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UsersGroup} from '../model/UsersGroups';
import {UsersGroupsAdminService} from '../services/usersGroupAdminService';
import {AuthenticationService} from '../services/authentication.service';
import {copyObj} from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-users-groups-list',
  templateUrl: './users-groups-list.component.html',
  styleUrls: ['./users-groups-list.component.css']
})
export class UsersGroupsListComponent implements OnInit {

  constructor(private api: UsersGroupsAdminService, private router: Router, private authService: AuthenticationService) {
  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  usersGroups: UsersGroup[] = [];
  dataSource: MatTableDataSource<UsersGroup>;
  // Colonnes a afficher dans le tableau, dans l'ordre d'affichage
  displayedColumns: string[] = ['id', 'name', 'description'];

  ngOnInit() {
    this.api.getUsersGroupList().subscribe(usersGroups => {
      this.usersGroups = usersGroups;
      // Rend les donnees compatible avec un tableau angular material
      this.dataSource = new MatTableDataSource(usersGroups);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    // console.clear()
    var logs = [{
      name: 'Admin rights',
      rights: this.authService.isUserAdmin(),
    },{
      name: 'Manager rights',
      rights: this.authService.isUserGestionnaire(),
    },{
      name: 'User rights',
      rights: this.authService.isUserSimpleUser(),
    }];

    console.group('%c------------------------------ LOGS ------------------------------', 'background: #444; color: #FBE');
    console.time('Timer1');
    console.table(logs);
    console.group('%c-- TEST LOG --', 'background: #665; color: #FBE');
    // console.trace('trace ' + this.authService.isUserGestionnaire());
    console.log('%c--------------- LOG ---------------', 'background: #555; color: yellow');
    console.log('|' + '\tAdmin rights:\t|\t' + this.authService.isUserAdmin() + '\t|');
    console.log('|\tManager rights:\t|\t' + this.authService.isUserGestionnaire() + '\t|');
    console.log('|\tUser rights:\t|\t' + this.authService.isUserSimpleUser() + '\t|');
    console.log('%c--------------- LOG ---------------', 'background: #555; color: yellow');
    console.groupEnd();
    console.timeEnd('Timer1');
    console.groupEnd();
  }

  public get isAdmin() {
    return this.authService.isUserAdmin();
  }
  // *ngIf="isAdmin"

  public get isGestionnaire() {
    return this.authService.isUserGestionnaire();
  }

  public get isUser() {
    return this.authService.isUserSimpleUser();
  }

  // Filtre
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelectGroup(id: number) {
    this.router.navigate(['/group-user/id/' + id.toString()]);
  }

  onAddGroup() {
    this.router.navigate(['/group-user/new']);
  }
}


interface MyObjTest {
  p1: string;
  p2: number;
  p3: boolean;
}
