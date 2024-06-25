import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private baseUrl = 'http://localhost:8000/api/user';

  constructor(private http: HttpClient,private router: Router) {}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllSales(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ sales: any[] }>(`${this.baseUrl}/sales`, { headers })
    .pipe(
      map(response => response.sales),
      catchError(error => {
        console.error('Failed to fetch sales data', error);
        return throwError(error);
      })
    );
  }

  getSaleDetails(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle scenario where token is missing
      return throwError('No token available');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}/sales/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching sale details:', error);
        return throwError(error);
      })
    );
  }

  getSaleById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/sales/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getCurrentUserId(): Observable<{ user_id: string }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ user_id: string }>(`${this.baseUrl}/info`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getCurrentUser(): Observable<{ user: any }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ user: any }>(`${this.baseUrl}/UserInfo`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  

  logout() {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/logout`, {}, { headers }).subscribe(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Logout failed', error);
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something bad happened; please try again later.');
  }

    //doctor
    AddDoctor(doctor:any): Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/add-doctor`, doctor);
    }
  
    ListAllDoctors(): Observable<any>{
      return this.http.get(`${this.baseUrl}/get-all-doctors`)
    }
  
    GetDoctorById(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/get-doctor-byId/${id}`);
    }
  
  
    updateDoctor(id: number, body: any): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/update-doctor-byId/${id}`, body);
    }
  
  
    deleteDoctor(id:number): Observable <any>{
      return this.http.delete<any>(`${this.baseUrl}/delete-doctor-byId/${id}`)
    }
    
    getLatestVisits(): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.get<any>(`${this.baseUrl}/visits/latest-visits`, { headers })
        .pipe(
          catchError(this.handleError)
        );
    }
    
}

