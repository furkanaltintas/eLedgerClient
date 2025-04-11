import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const LoginGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  debugger;
  if(!auth.isTokenValid()) {
    router.navigateByUrl("/login");
    return false;
  } else {
    debugger;
    if(auth.isTheCompanyOne()) router.navigate(['/']);
    return true;
  }
};
