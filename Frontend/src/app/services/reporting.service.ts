import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  private apiUrlVisitReports = 'http://localhost:8000/api/visit-reports';

  constructor(private http: HttpClient) { }

  getVisitReports(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlVisitReports);
  }

}
