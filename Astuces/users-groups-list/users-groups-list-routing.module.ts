import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersGroupsListComponent} from './users-groups-list.component';
import {UsersGroupsCreateComponent} from './users-groups-create/users-groups-create.component';
import {AuthGuard} from '../auth/_guards';
import {UsersGroupsAssociateComponent} from './users-groups-associate/users-groups-associate.component';
import {UsersGroupsScreenComponent} from './users-groups-screen/users-groups-screen.component';


const routes: Routes = [
  {path: 'id/:id', component: UsersGroupsScreenComponent, canActivate: [AuthGuard]},
  {path: 'new', component: UsersGroupsCreateComponent, canActivate: [AuthGuard]},
  {path: 'associate/:id', component: UsersGroupsAssociateComponent, canActivate: [AuthGuard]},
  {path: '', component: UsersGroupsListComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersGroupsListRoutingModule { }
