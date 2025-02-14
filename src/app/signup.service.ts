import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  signup(bookstore: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/auth/signup', bookstore);
  }
}
