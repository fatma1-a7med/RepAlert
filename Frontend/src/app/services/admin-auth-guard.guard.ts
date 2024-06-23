import { CanActivateFn } from '@angular/router';

export const adminAuthGuardGuard: CanActivateFn = (route, state) => {
  
  return true;
};
