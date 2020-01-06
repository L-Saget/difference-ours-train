import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListRoutingModule } from './users-list-routing.module';
import { UsersListComponent } from './users-list.component';
import {
  MatButtonModule, MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule, MatPaginatorModule, MatRadioModule, MatSelectModule, MatSlideToggleModule,
  MatSortModule,
  MatTableModule, MatTabsModule
} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserScreenComponent } from './user-screen/user-screen.component';
import { UserCreateComponent } from './user-create/user-create.component';
@NgModule({
  declarations: [UsersListComponent, UserDetailComponent, UserEditComponent, UserScreenComponent, UserCreateComponent],
  imports: [
    CommonModule,
    UsersListRoutingModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FlexModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
  ]
})
export class UsersListModule { }
