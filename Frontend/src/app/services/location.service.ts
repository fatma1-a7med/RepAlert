import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrl = 'http://127.0.0.1:8000/api/admin/location';

  constructor(private http: HttpClient) { }
  
  fetchUserLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  saveLocation(userId: string, latitude: number, longitude: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(`${this.apiUrl}`, { user_id: userId, latitude, longitude }, { headers })
      .pipe(
        catchError(error => {
          console.error('Error saving location:', error);
          return throwError(error);
        })
      );
  }
}
