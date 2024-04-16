import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const document = inject(DOCUMENT);
  const router = inject(Router);
  const token = document.defaultView?.localStorage?.getItem('auth');
  if (token) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
