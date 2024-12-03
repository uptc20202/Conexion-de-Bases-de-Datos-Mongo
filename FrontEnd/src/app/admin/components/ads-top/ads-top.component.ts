import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-ads-top',
  templateUrl: './ads-top.component.html',
  styleUrls: ['./ads-top.component.scss']
})
export class AdsTopComponent implements OnInit{

  @Input() backgroundColor: string = '#F45B69'; // Fondo del banner
  @Input() mensaje: string = 'Solo por hoy ENVIO GRATIS. Aprovecha esta oportunidad'; // Mensaje por defecto

  constructor() { }

  ngOnInit(): void {
  }

}
