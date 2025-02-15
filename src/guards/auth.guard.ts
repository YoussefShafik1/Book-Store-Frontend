import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);

  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('authToken') !== null) {
      return true;
    } else {
      _Router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};
