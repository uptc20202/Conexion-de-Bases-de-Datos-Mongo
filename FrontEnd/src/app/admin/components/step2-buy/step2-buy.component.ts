import { Component, EventEmitter, Output } from '@angular/core';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';
import { LoginService } from 'src/app/api/services/login/login.service';

@Component({
  selector: 'app-step2-buy',
  templateUrl: './step2-buy.component.html',
  styleUrls: ['./step2-buy.component.scss']
})
export class Step2BuyComponent {

  @Output() step3Btn: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() Subtotal: EventEmitter<number> = new EventEmitter<number>();
  @Output() shipping: EventEmitter<number> = new EventEmitter<number>();
  @Output() total: EventEmitter<number> = new EventEmitter<number>();
  @Output() aricles: EventEmitter<any[]> = new EventEmitter<any[]>();

  cartItems: any[] = []; // Array para almacenar los elementos del carrito
  shippingCost = 10000; // Costo de envío fijo

  imageCircleUnchecked = '../../../assets/shop/Ellipse_vacio.png';
  imageCircleChecked = '../../../assets/shop/Ellipse_check.png';



  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.retrieveCartItems();
  }

  retrieveCartItems(): void {
    const cartItemsString = localStorage.getItem('cart');
    if (cartItemsString) {
      this.cartItems = JSON.parse(cartItemsString);
      this.fillCartItemsDetails();
    }
  }

  calculateSubtotal(): number {
    const SubtotalValue = this.cartItems.reduce((total, item) => total + ((item.product?.retail_price ?? 0) * item.quantity), 0)
    this.Subtotal.emit(SubtotalValue)
    return SubtotalValue;
  }

  calculateTotal(): number {
    const totalValue = this.calculateSubtotal() + this.shippingCost;
    this.shipping.emit(this.shippingCost);
    this.total.emit(totalValue)
    this.aricles.emit(this.cartItems);
    return totalValue;
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  increaseQuantity(item: any): void {
    item.quantity++;
  }

  removeItem(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCartItems();
    }
  }

  saveCartItems(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  toStep3(){
    this.step3Btn.emit(true);
  }

  fillCartItemsDetails(): void {
    // Obtener detalles completos para cada elemento del carrito
    this.cartItems.forEach(item => {
      this.articlesService.getArticleById(item.productId).subscribe(
        (data: any) => {
          item.product = data; // Asignar los detalles del producto al elemento del carrito
        },
        (error) => {
          console.error(`Error fetching product details for ID ${item.productId}:`, error);
        }
      );
    });
  }

}
