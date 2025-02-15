import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books!: any;
  constructor(private bookService: BooksService) {}
  getBooks() {
    this.bookService.getBook().subscribe({
      next: (data) => {
        this.books = data;
        console.log(this.books);
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Completed'),
    });
  }
  ngOnInit(): void {
    this.getBooks();
  }
}
