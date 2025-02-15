import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);

  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('authToken') !== null) {
      _Router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
