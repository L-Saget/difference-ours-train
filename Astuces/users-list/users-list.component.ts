import {Component, OnInit, ViewChild} from '@angular/core';
import {UserAdminService} from '../services/userAdmin.service';
import {User} from '../model/User';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})


export class UsersListComponent implements OnInit {

  constructor(private api: UserAdminService, private router: Router) {
  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  users: User[] = [];
  dataSource: MatTableDataSource<User>;
  // Colonnes a afficher dans le tableau, dans l'ordre d'affichage
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'role'];


  ngOnInit() {
    this.api.getUserList().subscribe(users => {
      this.users = users;
      // Rend les donnees compatible avec un tableau angular material
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  // Filtre
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelectUser(id: number) {
    this.router.navigate(['/users/id/' + id.toString()]);
  }

  onAddUser() {
    this.router.navigate(['/users/new']);
  }
}
