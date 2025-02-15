import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface CartItem {
  productId: { _id: string };
  quantity: number;
}

interface CartResponse {
  items: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl = 'http://localhost:5000/api/cart'; 
  private bookUrl = 'http://localhost:5000/api/book/'; 

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
    return new HttpHeaders({ 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    });
  }

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(this.cartUrl, { headers: this.getAuthHeaders() });
  }

  getCartWithBookDetails(): Observable<CartItem[]> {
    return this.getCart().pipe(
      map(cart => {
        if (!cart || !cart.items) return []; // تأكيد أن `cart` يحتوي على `items`

        const uniqueItems = new Map<string, CartItem>();

        cart.items.forEach(item => {
          const productId = item.productId._id;
          
          if (uniqueItems.has(productId)) {
            uniqueItems.get(productId)!.quantity += item.quantity;
          } else {
            uniqueItems.set(productId, { ...item });
          }
        });

        return Array.from(uniqueItems.values());
      })
    );
  }

  addToCart(productId: string, quantity: number = 1): Observable<any> {
    return this.http.post<any>(`${this.cartUrl}/add`, { productId, quantity }, { headers: this.getAuthHeaders() });
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.post<any>(`${this.cartUrl}/remove`, { productId }, { headers: this.getAuthHeaders() });
  }

  deleteItemFromCart(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.cartUrl}/remove`, { 
      headers: this.getAuthHeaders(),
      body: { productId }
    });
  }
}
