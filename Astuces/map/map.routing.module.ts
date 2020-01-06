import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapComponent} from './map.component';
import {AuthGuard} from '../auth/_guards';
import {MapDeviceComponent} from './map-device/map-device.component';



const routes: Routes = [
  {path: 'id/:id', component: MapDeviceComponent, canActivate: [AuthGuard]},
  {path: '', component: MapComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
