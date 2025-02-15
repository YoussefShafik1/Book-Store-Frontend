import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { BooksComponent } from '../components/books/books.component';
import { authGuard } from '../guards/auth.guard';
import { SignupComponent } from '../components/signup/signup.component';
import { loginGuard } from '../guards/login.guard';
import { LoginComponent } from '../components/login/login.component';
import { BookDetailsComponent } from '../components/book-details/book-details.component';
import { CartPageComponent } from '../pages/cart-page/cart-page.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'books',
    component: BooksComponent,
    title: 'Books page',
    canActivate: [authGuard],
  },
  {
    path: 'book/:id',
    component: BookDetailsComponent,
    title: 'Book Details',
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    component: CartPageComponent,
    title: 'cart ',
    canActivate: [authGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'SignUp',
    canActivate: [loginGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'SignIn',
    canActivate: [loginGuard],
  },
];
