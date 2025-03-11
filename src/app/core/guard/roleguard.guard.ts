import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const roleguardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const requiredRoles = route.data['roles'] as string[];

  const role = localStorage.getItem('role');

  if (!role) {
    router.navigate(['/login']);
    return false;
  }

  if (requiredRoles.includes(role)) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;

};
