import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MedicalrepService {

  constructor(private _http:HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
    
  addMedrep(data:any):Observable<any>{
         return this._http.post('http://localhost:8000/api/users',data, { headers: this.getAuthHeaders() })  
    
  }


  getMedreplist():Observable<any>{
    return this._http.get('http://localhost:8000/api/users', { headers: this.getAuthHeaders() })  

}

updatemedrip(id: number, data: any): Observable<any> {
  return this._http.post(`http://localhost:8000/api/users/${id}?_method=PUT`, data, { headers: this.getAuthHeaders() });
}


deletemedrip(id:number):Observable<any>{

return this._http.delete(`http://localhost:8000/api/users/${id}`, { headers: this.getAuthHeaders() });
}


}
