import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login';
import {LogoutComponent} from './logout';
import {
  MatButtonModule, MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {JwtInterceptor} from './_helpers/jwt.interceptor'; // can't be shortened

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatProgressBarModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AuthComponent]
})
export class AuthModule { }






