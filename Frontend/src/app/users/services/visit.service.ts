import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisitModelTs } from '../../models/visit.model.ts';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private lapi = 'http://localhost:8000/api/user/locations';
  private dapiUrl = 'http://localhost:8000/api/user/get-all-doctors';
  private apiUrl = 'http://localhost:8000/api/user/visits';
  private vurl ='http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  getVisits(): Observable<VisitModelTs[]> {
    return this.http.get<VisitModelTs[]>(`${this.apiUrl}`);
  }

  createVisit(visit: VisitModelTs): Observable<VisitModelTs> {
    return this.http.post<VisitModelTs>(`${this.apiUrl}`, visit);
  }

  updateVisit(visitData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${visitData.id}`, visitData);
  }
  deleteVisit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.dapiUrl}`);
  }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.lapi);
  }

  
  getTools(): Observable<any[]> {
    return this.http.get<any[]>(`${this.vurl}user/tools`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.vurl}users`);
  }

  searchDoctors(query: string): Observable<any[]> {
    const apiUrl = `${this.vurl}/doctors/search?search=${query}`;
    return this.http.get<any[]>(apiUrl);
  }

}

