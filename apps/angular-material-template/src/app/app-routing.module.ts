import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(x => x.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(x => x.CustomersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(x => x.UsersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(x => x.AccountModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'icons',
    loadChildren: () => import('./icons/icons.module').then(x => x.IconsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'typography',
    loadChildren: () => import('./typography/typography.module').then(x => x.TypographyModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(x => x.AboutModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
