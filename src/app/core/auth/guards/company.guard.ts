import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const companyGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  debugger;
  if (!auth.isTokenValid()) {
    router.navigateByUrl("/login");
    return false;
  }

  if (!auth.isCompanySelected()) {
    router.navigateByUrl("/choose-company");
    return false;
  }

  return true;
};
