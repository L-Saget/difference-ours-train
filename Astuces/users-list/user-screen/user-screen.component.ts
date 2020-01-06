import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {UserAdminService} from '../../services/userAdmin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {StoreService} from '../../services/store.service';
import {NgxPermissionsService} from 'ngx-permissions';

@Component({
  selector: 'app-user-screen',
  templateUrl: './user-screen.component.html',
  styleUrls: ['./user-screen.component.css']
})
export class UserScreenComponent implements OnInit {

  user: User;
  currentUser: User;
  constructor(private api: UserAdminService,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private store: StoreService,
              private permissionsService: NgxPermissionsService,
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.api.getUserById(id).subscribe(user => {
      this.user = user;
      this.store.setUser(this.user);
    });

    console.log("screen");
    this.currentUser.id = AuthenticationService.getDecodedAccessToken(this.currentUser.token.toString()).id;
    this.currentUser.type = AuthenticationService.getDecodedAccessToken(this.currentUser.token.toString()).role;

    if (this.isAdmin) {
      this.permissionsService.addPermission('try02');
    }
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

  onGoBack() {
    this.router.navigate(['/users']);
  }
}
