import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsService {



  private apiUrl = environment.API_URL;  

  constructor(private http: HttpClient) {}



  getBookDetail(): Observable<any> {
   return this.http.get('http://localhost:5000/api/book/67adc8549a6427f0ccba647a');
  }

}

  //constructor(private http: HttpClient) {}

  


