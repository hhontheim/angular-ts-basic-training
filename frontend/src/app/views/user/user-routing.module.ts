import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SafeComponent } from './containers/safe/safe.component';
import { UserHomeComponent } from './components/userhome/userhome.component';

const routes: Routes = [
  {
    path: 'home',
    component: UserComponent,
    children: [
      {
        path: 'safe',
        component: SafeComponent,
        outlet: 'secondary'
      },
      {
        path: '',
        component: UserHomeComponent,
        outlet: 'secondary'
      }
    ],
  },
  {
    path: '',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
