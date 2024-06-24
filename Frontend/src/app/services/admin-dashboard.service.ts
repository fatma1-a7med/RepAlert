import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private baseUrl = 'http://localhost:8000/api/admin';
  private usersUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
    //sales
    getSales(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/sales`,{ headers: this.getAuthHeaders() });
    }
  
    getSale(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/sales/${id}`);
    }
  
    createSale(sale: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/sales`, sale);
    }
  
    updateSale(id: number, sale: any): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/sales/${id}`, sale);
    }
  
    deleteSale(id: number): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/sales/${id}`);
    }

    getUsers(): Observable<any[]> {
      return this.http.get<any[]>(`${this.usersUrl}/users`);
    }
  
    getSalesByUserId(userId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/users/${userId}/sales`);
    }
    me(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/me`, { headers: this.getAuthHeaders() });
    }
    //visit
    getAllVisits(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/AllVisits`);
    }
  }

