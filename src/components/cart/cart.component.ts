import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for standalone components

@Component({
  selector: 'app-cart',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import necessary modules
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartWithBookDetails().subscribe((response) => {
      this.cartItems = response.items; // ✅ استخراج البيانات الصحيحة
    });
  }

  increaseQuantity(item: any) {
    this.cartService.addToCart(item.productId, 1).subscribe(
      (response) => {
        console.log('➕ Quantity increased:', response);
        this.loadCart();
      },
      (error) => {
        console.error('❌ Error increasing quantity:', error);
      }
    );
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.deleteItemFromCart(item.productId).subscribe(
        (response) => {
          console.log('🔻 Quantity decreased:', response);
          this.loadCart();
        },
        (error) => {
          console.error('❌ Error decreasing quantity:', error);
        }
      );
    } else {
      this.deleteItem(item);
    }
  }

  deleteItem(item: any) {
    this.cartService.deleteItemFromCart(item.productId).subscribe(
      (response) => {
        console.log('🗑️ Item removed:', response);
        this.loadCart();
      },
      (error) => {
        console.error('❌ Error deleting item:', error);
      }
    );
  }
}
