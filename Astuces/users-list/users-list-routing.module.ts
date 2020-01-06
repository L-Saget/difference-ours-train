import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../auth/_guards';
import {UsersListComponent} from './users-list.component';
import {UserScreenComponent} from './user-screen/user-screen.component';
import {UserCreateComponent} from './user-create/user-create.component';


const routes: Routes = [
  {path: 'id/:id', component: UserScreenComponent, canActivate: [AuthGuard]},
  {path: 'new', component: UserCreateComponent, canActivate: [AuthGuard]},
  {path: '', component: UsersListComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersListRoutingModule { }
