import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if(auth.user.isAdmin) {
    return true; // Admin ise geçiş serbest
  } else {
    router.navigate(['/forbidden']);
    return false;
  }
};
