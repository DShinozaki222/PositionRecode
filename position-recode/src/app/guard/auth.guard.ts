import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthCtlService } from '../services/auth-ctl.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router: Router = inject(Router);
  const authCtl: AuthCtlService = inject(AuthCtlService);
  const user = authCtl.storageCheck();
  if (!user.mail) {
    await router.navigate(['login']);
    return true;
  }
  // authCtl.setUser = user;
  return true;
};
