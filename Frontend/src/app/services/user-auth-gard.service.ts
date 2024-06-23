import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAuthServicesService } from '../services/user-auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private authService: UserAuthServicesService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Allow navigation to /user/home if user is logged in
    } else {
      this.router.navigate(['/user/login']); // Redirect to login page if not authenticated or not user
      return false;
    }
  }
}
