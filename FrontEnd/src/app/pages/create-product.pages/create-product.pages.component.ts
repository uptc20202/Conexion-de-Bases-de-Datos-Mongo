import { Component } from '@angular/core';

@Component({
  selector: 'app-create-product.pages',
  templateUrl: './create-product.pages.component.html',
  styleUrls: ['./create-product.pages.component.scss']
})
export class CreateProductPagesComponent {

  position: boolean= true;

  ngOnInit(): void {}

  changePage(num: number){
    if(num == 2){
      this.position = false;
    }else{
      this.position = true;
    }
  }
}
