import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserAuthServicesService } from '../user-auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(
    private authService: UserAuthServicesService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/user/home']);
      return true;
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }

}