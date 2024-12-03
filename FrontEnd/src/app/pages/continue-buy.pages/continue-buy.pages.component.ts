import { Component } from '@angular/core';

@Component({
  selector: 'app-continue-buy.pages',
  templateUrl: './continue-buy.pages.component.html',
  styleUrls: ['./continue-buy.pages.component.scss']
})
export class ContinueBuyPagesComponent {
  step2: boolean =true;
  step3: boolean =false;

  calculateSubtotal: string|number ="";
  calculateTotal: string|number="";
  shippingCost: string|number="";
  articles: any[] = [];

  toStep(step: string){
    switch(step){
      case "2":
        this.step3 = false;
        this.step2 = true;
        break;
        case "3":
          this.step3 = true;
          this.step2 = false;
          break;
      default:
       "1"
    }
  }

}
