import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {
  private apiUrl = 'http://localhost:8000/api/admin/profile'; // Adjust URL as per your Laravel API

  constructor(private http: HttpClient) { }

  getAllAdminProfiles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getAdminProfile(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateAdminProfile(id: number, adminProfile: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}`, adminProfile).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}