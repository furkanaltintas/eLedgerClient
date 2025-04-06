import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { UsersComponent } from './features/dashboard/pages/users/users.component';
import { LoginComponent } from './features/account/pages/login/login.component';
import { AuthService } from './core/auth/auth.service';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    //canActivateChild: [() => inject(AuthService).isAuthenticated()],
    children: [
    { path: "", component: DashboardComponent },
    { path: 'users', component: UsersComponent}
  ]}
];
