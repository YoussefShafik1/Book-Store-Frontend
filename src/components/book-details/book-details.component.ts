import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDetailsService } from '../../services/book-details.service';
import { CommonModule } from '@angular/common';
import { ToptenComponent } from '../topten/topten.component';
import { FeaturesComponent } from '../features/features.component';
import { SubscribeComponent } from '../subscribe/subscribe.component';
import { CartService } from '../../services/add-cart.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule,
    ToptenComponent,
    FeaturesComponent,
    SubscribeComponent,
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  book: any;

  constructor(
    private route: ActivatedRoute,
    private bookDetailsService: BookDetailsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Retrieve the `id` from the route parameters
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Fetch the book details using the `id`
      this.bookDetailsService.getBookDetail(id).subscribe({
        next: (data) => {
          this.book = data;
          console.log('Book details:', this.book);
        },
        error: (error) => {
          console.error('Error fetching book details:', error);
        },
      });
    } else {
      console.error('No book ID found in the URL.');
    }
  }
  ratingBreakdown = [
    { stars: 5, percent: 86 },
    { stars: 4, percent: 61 },
    { stars: 3, percent: 12 },
    { stars: 2, percent: 5 },
    { stars: 1, percent: 8 },
  ];

  //Star logic
  fullStars = Array(Math.floor(4.7)).fill(0);
  halfStar = 4.7 % 1 !== 0;
  emptyStars = Array(5 - Math.ceil(4.7)).fill(0);

  // add to cart

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
