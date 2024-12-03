import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';

@Component({
  selector: 'app-bulk-purchase',
  templateUrl: './bulk-purchase.component.html',
  styleUrls: ['./bulk-purchase.component.scss']
})
export class BulkPurchaseComponent  implements OnInit {
  @Input() price1To6: number = 100;
  @Input() price7To19: number = 90;
  @Input() price20OrMore: number = 80;
  @Input() colors: string = 'Rojo';
  @Input() sizes: any[] = ['S', 'M', 'L', 'XL'];
  @Input() productId: string = "";

  @Output() edit: EventEmitter<boolean> = new EventEmitter<boolean>;
  @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>;

  sizeQuantities: { [key: string]: number } = {};

  unitPrice: number = 0;
  quantity: number = 1;
  subtotal: number = 0;

  ngOnInit() {
    this.sizes.forEach(size => this.sizeQuantities[size] = 0);
    this.calculatePrices();
  }

  constructor(private articleService:ArticlesService){}

  increaseSize(size: string) {
    this.sizeQuantities[size]++;
    this.calculatePrices();
  }

  decreaseSize(size: string) {
    if (this.sizeQuantities[size] > 0) {
      this.sizeQuantities[size]--;
    }
    this.calculatePrices();
  }

  calculatePrices() {
    this.quantity = Object.values(this.sizeQuantities).reduce((a, b) => a + b, 0);
    if (this.quantity <= 6 && this.price1To6) {
      this.unitPrice = this.price1To6;
    } else if (this.quantity > 6 && this.quantity <= 19 && this.price7To19) {
      this.unitPrice = this.price7To19;
    } else if(this.price20OrMore){
      this.unitPrice = this.price20OrMore;
    }
    this.subtotal = this.unitPrice * this.quantity;
  }

  addMoreItems() {
    this.edit.emit(true);
  }

  validateStock(){
    this.sizes.forEach(
      size => {
        console.log("Paso por talla: "+size.size+" con cantidad: "+this.sizeQuantities[size.size]);
        if(this.sizeQuantities[size.size] > size.quantity){
          console.log("Seleccion mayor a inventario");
          this.sizeQuantities[size.size] =  size.quantity;
        }else if(this.sizeQuantities[size.size]<0){
          console.log("Seleccion con valor negativo");
          this.sizeQuantities[size.size] * -1;
        }else if(!this.sizeQuantities[size.size]){
          console.log("NO HAY SELECCIÓN");
          this.sizeQuantities[size.size] = 0;
        }
        console.log("")
      }
    );
    console.log("")
    console.log("")

  }

  addToCart(): void {
    let cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    console.log("Estado de tallas: ", this.sizes)
    console.log("Estado de selecciones: ",this.sizeQuantities)
    // Verificar si el producto con la misma talla ya está en el carrito}
    this.sizes.forEach(
      sizes =>{

        if(this.sizeQuantities[sizes.size]> 0){
          console.log("Cantidad de tallas: ",this.sizeQuantities[sizes.size]);
          console.log("Talla o key: ",sizes.size)

          const itemIndex = this.productInCartIndex(
            this.productId, sizes.size, cartItems);
          console.log("Indeex producto en carro: ",itemIndex)
          if (itemIndex !== -1) {
            // Si el producto con la misma talla ya está en el carrito, actualizar la cantidad
            cartItems[itemIndex].quantity += this.quantity;
          } else {
            // Agregar el nuevo producto al carrito
            const newItem = {

              productId: this.productId,
              size: sizes.size,
              quantity: this.sizeQuantities[sizes.size]
            };
            cartItems.push(newItem);
            console.log("Item a agregar en el carro: ",newItem)
          }

          this.articleService.setCard(cartItems)
          // Guardar el carrito actualizado en el localStorage
          //localStorage.setItem('cart', JSON.stringify(cartItems));

          // Reiniciar valores
          console.log("Estado final de tallas: ",this.sizeQuantities[sizes.size]);
          this.sizeQuantities[sizes.size] = 0;
          this.back.emit(true);
          this.edit.emit(true);
        }

      }
    );
  }

  private productInCartIndex(productId: string | null, size: string, cartItems: any[]): number {
    return cartItems.findIndex(
      (item: any) => item.productId === productId && item.size === size
    );
  }
}
