import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSidenav } from '@angular/material/sidenav';

import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'QELDE1OE1T?';
  // title = 'Quelle est la différence entre un Ours et un Train ?';

  mode = new FormControl('push');
  loading = true;

  // constructor(public dialog: MatDialog, private router: Router) {
  //   router.events.subscribe((event: RouterEvent) => {
  //     this.navigationInterceptor(event);
  //   });
  // }
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }

  difference() {
    //  this.router.navigateByUrl('difference');
  }
  add() {
    //  this.router.navigateByUrl('add');
  }
  authenticated() {
    if (localStorage.getItem('LoggedIn') == null) {
      return false;
    }
    if (localStorage.getItem('LoggedIn') != null) {
      return true;
    } else { return false; }
  }

  logout() {
    console.log('clicked');
    // const dialogRef = this.dialog.open(LogoutComponent, {
    //   width: "430px"
    // });
    // dialogRef.afterClosed().subscribe(data => {
    //   console.log("Logout closed");
    //   console.log(data);
    // });
  }

  openDialog() {
    // console.log("clicked");
    // const dialogRef = this.dialog.open(LoginComponent, {
    //   width: "300px"
    // });
    // dialogRef.afterClosed().subscribe(data => {
    //   console.log("Login closed");
    //   console.log(data);
    // });
  }
  openDialog1() {
    // console.log("clicked");
    // const dialogRef = this.dialog.open(SignupComponent, {
    //   height: "auto",
    //   width: "430px"
    // });
    // dialogRef.afterClosed().subscribe(data => {});
  }

  // public socialSignIn(socialPlatform : string) {
  //   let socialPlatformProvider;
  //   if(socialPlatform == "facebook"){
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   }else if(socialPlatform == "google"){
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   }

  //   this.socialAuthService.signIn(socialPlatformProvider).then(
  //     (userData) => {
  //       console.log(socialPlatform+" sign in data : " , userData);      }
  //   );
  // }

  ngOnInit(): void {
    this.authenticated();
  }

}
