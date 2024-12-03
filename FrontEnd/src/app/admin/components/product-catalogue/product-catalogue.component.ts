import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-catalogue',
  templateUrl: './product-catalogue.component.html',
  styleUrls: ['./product-catalogue.component.scss']
})
export class ProductCatalogueComponent {

  @Input() imageUrl: string = '../../../assets/catalogue/Image_Placeholder.png'; // URL de la imagen
  @Input() text: string = 'Cargando Producto...'; // Texto de la tarjeta
  @Input() price: any = '$00.000'; // Precio de la tarjeta
  @Input() cardWidth: string = '25%';
  @Input() routerLink: string = "";

  constructor(private router: Router){}

  routeProduct() {
    console.log(this.routerLink)
    this.router.navigate(['/catalogue/product/'+this.routerLink]);
  }

}
