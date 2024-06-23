import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject to hold the authentication status
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());

  // Observable to allow components to subscribe to authentication status changes
  authStatus = this.loggedIn.asObservable();

  constructor(private Token: TokenService, private router: Router) { }

  /**
   * Change the authentication status and notify all subscribers.
   * @param value The new authentication status.
   */
  changeAuthStatus(value: boolean): void {
    this.loggedIn.next(value);
  }
  getUserId(): any | null {
    const token = this.Token.get();
    if (token) {
      const payload = this.Token.payload(token);
      return payload ? payload.sub : null; // Assuming 'sub' contains user ID in the payload
    }else {
      this.router.navigate(['/admin/login']);
    }
  }

  isLoggedIn(): boolean {
    return this.Token.isValid();
  }
}




