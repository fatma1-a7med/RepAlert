import { routes } from './../app.routes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
export interface LoginData {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserAuthServicesService {

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/user/login`, { email, password }).pipe(
        tap((response: any) => {
            if (response && response.token) {
                console.log('User data:', response.user); // Log the user data to the console
                this.saveToken(response.token); // Save the token to local storage
                localStorage!.setItem('token', response.token); // Save token to localStorage
                localStorage!.setItem('user_id', response.user.id); // Save user ID to localStorage

                this.router.navigate(['/user/home']);
            }
        }),
        catchError((error) => {
            return throwError(error);
        })
    );
  }



  getToken(): string | null {
    return localStorage!.getItem('token');
  }

  isAuthenticated(): any {
    
    tap((response: any) => {
      if (response && response.token) {
        localStorage!.setItem('token', response.token); // Save token to localStorage
        localStorage!.setItem('user_id', response.user_id);
        
      }
    }),
    catchError((error) => {
      return throwError(error);
    })
  
  }



  saveToken(token: string) {
    localStorage!.setItem('token', token);
  }

 

  logout() {
    localStorage!.removeItem('token');
  }



  isUser(): boolean {
    // Check if user is regular user (implement based on your logic)
    const role = localStorage!.getItem('role');
    return role === 'user';
  }

  isLoggedIn(): boolean {
    return !!localStorage!.getItem('token');
  }
}
