import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroSectionComponent } from '../components/hero-section/hero-section.component';
import { TrendingComponent } from '../components/trending/trending.component';
import { ToptenComponent } from '../components/topten/topten.component';
import { FeaturedBookComponent } from '../components/featured-book/featured-book.component';
import { NewsComponent } from '../components/news/news.component';
import { CounterComponent } from '../components/counter/counter.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
