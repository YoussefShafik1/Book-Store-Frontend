import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api/cart/add';

  constructor(private http: HttpClient) {}

  addToCart(productId: string, quantity: number): Observable<any> {
    // Retrieve the authToken from localStorage
    const authToken = localStorage.getItem('authToken');

    // Set up the headers with the authToken
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`, // Include the token in the Authorization header
    });

    const body = { productId, quantity };
    return this.http.post(this.apiUrl, body, { headers });
  }
}
