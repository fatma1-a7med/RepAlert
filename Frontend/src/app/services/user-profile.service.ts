import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/user/profile';

  constructor(private http: HttpClient) { }

  getUserProfile(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateUserProfile(id: number, userProfile: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}`, userProfile).pipe(
    catchError(error => {
      return throwError(error);
    })
  );
  }
}
