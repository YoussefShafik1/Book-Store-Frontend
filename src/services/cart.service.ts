import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface CartItem {
  productId: string;
  quantity: number;
  bookDetails?: BookDetails;
}

interface CartResponse {
  items: CartItem[];
}

interface BookDetails {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  author: string;
  publisher: string;
  book_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUrl = 'http://localhost:5000/api/cart';
  private bookUrl = 'http://localhost:5000/api/book/';
  private orderUrl = 'http://localhost:5000/api/orders';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Replace 'authToken' with your key
    if (!token) {
      throw new Error('No authentication token found in localStorage.');
    }
    // Return headers with the token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(this.cartUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  getBookDetails(productId: string): Observable<BookDetails> {
    return this.http.get<BookDetails>(`${this.bookUrl}${productId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getCartWithBookDetails(): Observable<{
    items: CartItem[];
    totalAmount: number;
  }> {
    return this.getCart().pipe(
      switchMap((cart) => {
        if (!cart || !cart.items) return [];

        const uniqueItems = new Map<string, CartItem>();
        let totalAmount = 0;

        cart.items.forEach((item) => {
          const productId = (item.productId as any)?._id || item.productId;
          if (productId) {
            if (uniqueItems.has(productId)) {
              uniqueItems.get(productId)!.quantity += item.quantity;
            } else {
              uniqueItems.set(productId, {
                productId,
                quantity: item.quantity,
              });
            }
          }
        });

        const requests = Array.from(uniqueItems.keys()).map((productId) =>
          this.getBookDetails(productId).pipe(
            map((bookDetails) => {
              totalAmount +=
                bookDetails.price * (uniqueItems.get(productId)?.quantity ?? 1);
              return {
                productId,
                quantity: uniqueItems.get(productId)?.quantity ?? 1,
                bookDetails,
              } as CartItem;
            })
          )
        );

        return forkJoin(requests).pipe(
          map((items) => ({ items, totalAmount }))
        );
      })
    );
  }

  addToCart(productId: string, quantity: number = 1): Observable<any> {
    return this.http.post<any>(
      `${this.cartUrl}/add`,
      { productId, quantity },
      { headers: this.getAuthHeaders() }
    );
  }

  deleteItemFromCart(productId: string): Observable<any> {
    return this.http.request<any>('DELETE', `${this.cartUrl}/remove`, {
      headers: this.getAuthHeaders(),
      body: { productId },
    });
  }

  createPaymentIntent(amount: number): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(
      `${this.orderUrl}`,
      { amount }, // لازم نبعت المبلغ هنا
      { headers: this.getAuthHeaders() }
    );
  }
}
