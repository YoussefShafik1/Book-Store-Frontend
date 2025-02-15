import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDetailsService } from '../../services/book-details.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class  BookDetailsComponent  {
  book: any={};
  constructor(private bookdetailService: BookDetailsService) {}
  getBookDetails() {
    this.bookdetailService.getBookDetail().subscribe({
      next: (data) => {
        this.book = data;
        console.log(this.book);
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Completed'),
    });
  }
  ngOnInit(): void {
    this.getBookDetails();
  }


 
  ratingBreakdown = [
    { stars: 5, percent: 86 },
    { stars: 4, percent: 61 },
    { stars: 3, percent: 12 },
    { stars: 2, percent: 5 },
    { stars: 1, percent: 8 }
  ];

  //Star logic
  fullStars = Array(Math.floor((4.7))).fill(0);
  halfStar = (4.7) % 1 !== 0;
  emptyStars = Array(5 - Math.ceil(4.7)).fill(0);


  
  }
