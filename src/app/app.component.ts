import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CartComponent,CheckoutFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'checkout';
}
