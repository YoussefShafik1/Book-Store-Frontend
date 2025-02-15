import { Component } from '@angular/core';
import { CheckoutFormComponent } from '../../components/checkout-form/checkout-form.component';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CheckoutFormComponent, CartComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {}
