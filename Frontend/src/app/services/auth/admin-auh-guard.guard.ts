import { AdminAuthServiceService } from './../admin-auth-services.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AdminAuthServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin/admin-dashboard']);
      return true;
    } else {
      this.router.navigate(['/admin/login']);
      return false;
  }
}
}
