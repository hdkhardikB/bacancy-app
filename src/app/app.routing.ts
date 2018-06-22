import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layout/full/full.component';
import { EmptyComponent } from './layout/empty/empty.component';
import { AuthGuard } from './main/guards/auth.guard';
import { NgModule } from '@angular/core';

const AppRoutes: Routes = [{
  path: '',
  component: FullComponent,
  children: [{
    path: '',
    redirectTo: '/core',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }, {
    path: 'core',
    loadChildren: './core/core.module#CoreModule',
    canActivate: [AuthGuard]
  }]
}, {
  path: '',
  component: EmptyComponent,
  children: [
    {
      path: '',
      loadChildren: './account/account.module#AccountModule',
      canActivate: [AuthGuard],
      data: { isPublic: true }
    }
  ]
}];


@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

