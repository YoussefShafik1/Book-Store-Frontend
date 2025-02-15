import { Component } from '@angular/core';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { TrendingComponent } from '../trending/trending.component';
import { ToptenComponent } from '../topten/topten.component';
import { FeaturedBookComponent } from '../featured-book/featured-book.component';
import { NewsComponent } from '../news/news.component';
import { CounterComponent } from '../counter/counter.component';
import { FeaturesComponent } from '../features/features.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { SubscribeComponent } from '../subscribe/subscribe.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    TrendingComponent,
    ToptenComponent,
    FeaturedBookComponent,
    NewsComponent,
    CounterComponent,
    FeaturesComponent,
    TestimonialsComponent,
    SubscribeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
