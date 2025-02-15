import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { BookDetailsComponent } from "./components/book-details/book-details.component";
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from "./components/footer/footer.component";
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ BookDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book details';
}
