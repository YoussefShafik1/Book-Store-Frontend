import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CartService } from '../../services/add-cart.service';

@Component({
  selector: 'app-topten',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topten.component.html',
  styleUrls: ['./topten.component.css'],
})
export class ToptenComponent implements OnInit {
  private url = 'http://localhost:5000/api/book';
  http = inject(HttpClient);
  books: any[] = [];

  ngOnInit(): void {
    this.getBooks().subscribe({
      next: (data) => (this.books = data),
      error: (error) => console.error('There was an error!', error),
    });
  }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      catchError((error) => {
        console.error('Error fetching books', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }

  getChunkedBooks(books: any[], chunkSize: number): any[] {
    const chunks = [];
    for (let i = 0; i < books.length; i += chunkSize) {
      chunks.push(books.slice(i, i + chunkSize));
    }
    return chunks;
  }

  // add to cart
  constructor(private cartService: CartService) {}

  addToCart(productId: string, quantity: number): void {
    this.cartService.addToCart(productId, quantity).subscribe({
      next: (response) => {
        console.log('Product added to cart', response);
      },
      error: (error) => {
        console.error('Error adding product to cart', error);
      },
    });
  }
}
