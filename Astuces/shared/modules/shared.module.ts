import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from '../../core/core.module';

@NgModule({
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
  ]
})
export class SharedModule {
}
