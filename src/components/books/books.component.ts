import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { FeaturesComponent } from '../features/features.component';
import { CartService } from '../../services/add-cart.service';
import { SubscribeComponent } from '../subscribe/subscribe.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { FeaturedBookComponent } from '../featured-book/featured-book.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    FeaturesComponent,
    SubscribeComponent,
    TestimonialsComponent,
    FeaturedBookComponent,
    RouterLink,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {
  books: any[] = []; // Initialize books as an empty array

  // Combine dependencies into a single constructor
  constructor(
    private bookService: BooksService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBook().subscribe({
      next: (data) => {
        this.books = data;
        console.log(this.books);
      },
      error: (error) => {
        console.error('Error:', error);
        // Optionally, display a user-friendly error message
      },
      complete: () => console.log('Completed'),
    });
  }

  addToCart(productId: string, quantity: number): void {
    this.cartService.addToCart(productId, quantity).subscribe({
      next: (response) => {
        console.log('Product added to cart', response);
        // Optionally, provide user feedback (e.g., a toast message)
      },
      error: (error) => {
        console.error('Error adding product to cart', error);
        // Optionally, display a user-friendly error message
      },
    });
  }
}
