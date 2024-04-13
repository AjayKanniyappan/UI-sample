import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  get(endpoint: string, token?: string): Observable<any> {
    const headers = token
      ? new HttpHeaders({ 'Content-Type': 'application/json' }).set(
          'Authorization',
          `Bearer ${token}`
        )
      : undefined;
    return this.http.get(`${this.baseUrl}${endpoint}`, { headers });
  }

  post(endpoint: string, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = {
      headers: headers,
    };
    return this.http.post(`${this.baseUrl}${endpoint}`, data, options);
  }
}
