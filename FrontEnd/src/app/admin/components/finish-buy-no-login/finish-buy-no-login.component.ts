import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-finish-buy-no-login',
  templateUrl: './finish-buy-no-login.component.html',
  styleUrls: ['./finish-buy-no-login.component.scss']
})
export class FinishBuyNoLoginComponent implements OnInit{
   reference: string = '';

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get('idsale');
      id? this.reference = id : '';
    });
  }

  constructor(private activeRoute:ActivatedRoute){}

  continueOnWhatsApp() {
    const whatsappNumber = '3108746952'; // Reemplaza con el número de WhatsApp de la empresa
    const message = `Hola, deseo continuar la venta con la referencia ${this.reference}.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  }
}
