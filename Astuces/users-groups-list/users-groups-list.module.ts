import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersGroupsListRoutingModule } from './users-groups-list-routing.module';
import { UsersGroupsListComponent } from './users-groups-list.component';
import { UsersGroupsScreenComponent } from './users-groups-screen/users-groups-screen.component';
import { UsersGroupsEditComponent } from './users-groups-edit/users-groups-edit.component';
import { UsersGroupsDetailsComponent } from './users-groups-details/users-groups-details.component';
import { UsersGroupsCreateComponent } from './users-groups-create/users-groups-create.component';
import { UsersGroupsAssociateComponent } from './users-groups-associate/users-groups-associate.component';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatPaginatorModule, MatSortModule, MatTableModule,
  MatTabsModule
} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    UsersGroupsListComponent,
    UsersGroupsScreenComponent,
    UsersGroupsEditComponent,
    UsersGroupsDetailsComponent,
    UsersGroupsCreateComponent,
    UsersGroupsAssociateComponent
  ],
  imports: [
    CommonModule,
    UsersGroupsListRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    FlexModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FormsModule
  ]
})
export class UsersGroupsListModule { }
