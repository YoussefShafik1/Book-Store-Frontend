import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BookDetailsService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  // Accept the `id` as a parameter
  getBookDetail(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}book/${id}`);
  }
}
