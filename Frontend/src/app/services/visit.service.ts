
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private apiUrl = 'http://localhost:8000/api/admin'; // Base URL for admin-related endpoints
  private uURL = 'http://localhost:8000/api'; // Base URL for user-related endpoints

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getMedreplist(): Observable<any> {
    return this.http.get(`${this.uURL}/users`, { headers: this.getAuthHeaders() }); // Endpoint for fetching the user list
  }

  getVisits(): Observable<any> {
    return this.http.get(`${this.apiUrl}/visits`);
  }

  searchVisitsByUserName(firstName: string, lastName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/visits/searchByUsername/${firstName}/${lastName}`);
  }

  searchVisitsByDateRange(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/visits/searchByDateRange/${startDate}/${endDate}`);
  }

  getRecentVisits(userId: number, limit: number = 5): Observable<any> {
    return this.http.get(`${this.apiUrl}/visits/recent`, { params: { userId: userId.toString(), limit: limit.toString() } });
  }

  getVisitHistory(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/visits/history/${userId}`);
  }

  getPlannedVisits(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/visits/planned/${userId}`);
  }

  getVisitDetailsById(visitId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/visit/${visitId}`);
  }
}
