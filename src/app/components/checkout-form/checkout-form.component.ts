import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {
  @ViewChild('cardElement') cardElementRef!: ElementRef; // ربط عنصر الكارد بـ HTML

  checkoutForm: FormGroup;
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: StripeCardElement | null = null;
  clientSecret: string = '';
  totalAmount: number = 0;

  constructor(private fb: FormBuilder, private cartService: CartService) {
    this.checkoutForm = this.fb.group({
      cardInfo: [''] // في حال احتجت بيانات أخرى غير Stripe
    });
  }

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51QpOgoP85Ow2USMIZI8bIJ88PT6MmV6CaqUOGq27bguCEytdgML1FlV4kggEjcMz2z3BsiSzWlJFphNo64K0yBrm00mFYVqNg8');

    if (!this.stripe) {
      console.error("Failed to load Stripe!");
      return;
    }

    this.cartService.getCartWithBookDetails().subscribe((cartData: { items: any[], totalAmount: number }) => {
      this.totalAmount = cartData.totalAmount;
    });

    // انتظر قليلاً حتى يتم تحميل Stripe بالكامل ثم جهّز الفورم
    setTimeout(() => {
      this.initStripeElements();
    }, 300);
  }

  initStripeElements() {
    if (!this.stripe) {
      console.error("Stripe is not available.");
      return;
    }

    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create('card');

    if (this.cardElementRef) {
      this.cardElement.mount(this.cardElementRef.nativeElement);
      console.log("Card Element Mounted Successfully!");
    } else {
      console.error("cardElementRef is not available.");
    }
  }

  createOrder() {
    this.cartService.createPaymentIntent(this.totalAmount).subscribe((response: { clientSecret: string }) => {
      this.clientSecret = response.clientSecret;
      this.processPayment();
    });
  }

  async processPayment() {
    if (!this.stripe || !this.clientSecret || !this.cardElement) return;

    const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.clientSecret, {
      payment_method: {
        card: this.cardElement,
      }
    });

    if (error) {
      alert("Payment Failed: " + error.message);
    } else {
      alert("Payment Successful!");
    }
  }

  submitPayment() {
    this.createOrder(); // استدعاء الدفع عند الضغط على الزر
  }
}
