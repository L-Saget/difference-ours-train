import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DifferenceComponent} from './components/difference/difference.component';
import {AddDifferenceComponent} from './components/add-difference/add-difference.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'difference',
    pathMatch: 'full'
  },
  {
    path: 'difference',
    // canActivate: [AuthGuard],
    component: DifferenceComponent,
  },
  {
    path: 'add',
    // canActivate: [AuthGuard],
    component: AddDifferenceComponent,
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
