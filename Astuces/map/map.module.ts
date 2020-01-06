import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from './map.component';
import {CoreModule} from '../core/core.module';
import {FilterPipe} from '../services/FilterPipe';
import {MapRoutingModule} from './map.routing.module';
import { MapDeviceComponent } from './map-device/map-device.component';


@NgModule({
  declarations: [
    MapComponent,
    FilterPipe,
    MapDeviceComponent,
  ],
  imports: [
    CoreModule,
    MapRoutingModule,
    // RouterModule.forChild(routes)
  ]
})
export class MapModule {
}
