import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';

@Component({
  selector: 'app-shop-car',
  templateUrl: './shop-car.component.html',
  styleUrls: ['./shop-car.component.scss']
})
export class ShopCarComponent implements OnInit {


  cartItems: any[] = []; // Array para almacenar los elementos del carrito
  //articles: any[] = [];
  shippingCost = 10; // Costo de envío fijo
  @Output() amountProductsCard: EventEmitter<number> = new EventEmitter<number>;

  constructor(private router: Router,private http: HttpClient,private articlesService: ArticlesService) { }

  ngOnInit(): void {
    // Obtener los elementos del carrito almacenados en localStorage
    const storedCart = localStorage.getItem('cart');

    this.cartItems = this.articlesService.getCard()
    this.amountProductsCard.emit(this.cartItems?.length)
    if(this.cartItems){
      this.fillCartItemsDetails();
    }else{
      this.cartItems=[];
    }
  }

  deleteItem(item:any){
    this.cartItems =  this.cartItems.filter(product => product != item);
    this.saveCart();
  }

  fillCartItemsDetails(): void {
    // Obtener detalles completos para cada elemento del carrito
    this.cartItems.forEach(item => {
      console.log('view item',item)
      this.articlesService.getArticleById(item?.productId).subscribe(
        (data: any) => {
          item.product = data; // Asignar los detalles del producto al elemento del carrito
        },
        (error) => {
          console.error(`Error fetching product details for ID ${item.productId}:`, error);
        }
      );
    });
  }


  increaseQuantity(item: any): void {
    item.quantity++;
    this.saveCart(); // Guardar carrito actualizado en el localStorage
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveCart(); // Guardar carrito actualizado en el localStorage
    }
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) =>
        total + ((item.product?.retail_price ?? 0) * item.quantity), 0);
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.shippingCost;
  }

  saveCart(): void {
    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  checkout(): void {
    // Implementa la lógica para finalizar la compra
    console.log('Compra finalizada!');
  }

  clearCart(): void {
    // Limpiar el carrito (eliminar todos los elementos)
    this.cartItems = [];
    localStorage.removeItem('cart'); // Eliminar el carrito del localStorage
  }

  cartRoute() {
    this.router.navigate(['/cart']);
  }
}
