import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-accesorios',
  templateUrl: './banner-accesorios.component.html',
  styleUrls: ['./banner-accesorios.component.scss']
})
export class BannerAccesoriosComponent {

  constructor(private router:Router){}

  navigate(path:string){
    this.router.navigate([path]);
  }

}
