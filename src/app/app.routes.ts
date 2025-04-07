import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { UsersComponent } from './features/dashboard/pages/users/users.component';
import { LoginComponent } from './features/account/pages/login/login.component';
import { CompaniesComponent } from './features/dashboard/pages/companies/companies.component';
import { ChooseCompanyComponent } from './features/account/pages/choose-company/choose-company.component';
import { LoginGuard } from './core/auth/guards/login.guard';
import { companyGuard } from './core/auth/guards/company.guard';
import { roleGuard } from './core/auth/guards/role.guard';
import { ForbiddenComponent } from './features/error/pages/forbidden/forbidden.component';
import { NotFoundComponent } from './features/error/pages/not-found/not-found.component';

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: 'choose-company', component: ChooseCompanyComponent, canActivate: [LoginGuard] }, // Sadece login olanlar görebilir
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [companyGuard], // [() => inject(AuthService).isAuthenticated()] Eski yapı
    children: [
    { path: '', component: DashboardComponent },
    { path: 'users', component: UsersComponent, canActivate: [roleGuard]},
    { path: 'companies', component: CompaniesComponent, canActivate: [roleGuard]}]
  },
  { path: 'forbidden', component: ForbiddenComponent},
  { path: '**', component: NotFoundComponent }
];
