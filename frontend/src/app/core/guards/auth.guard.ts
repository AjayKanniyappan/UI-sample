import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authToken = sessionStorage.getItem('auth-token');
  const router = new Router();

  if (authToken) {
    return true;
  } else {
    router.navigate(['/register']);
    return false;
  }
};
