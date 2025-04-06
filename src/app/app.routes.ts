import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { UsersComponent } from './features/dashboard/pages/users/users.component';
import { LoginComponent } from './features/account/pages/login/login.component';
import { AuthService } from './core/auth/auth.service';
import { inject } from '@angular/core';
import { CompaniesComponent } from './features/dashboard/pages/companies/companies.component';
import { ChooseCompanyComponent } from './features/account/pages/choose-company/choose-company.component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'choose-company',
    component: ChooseCompanyComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [() => inject(AuthService).isAuthenticated()],
    children: [
    { path: '', component: DashboardComponent },
    { path: 'users', component: UsersComponent},
    { path: 'companies', component: CompaniesComponent}
  ]}
];
