import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  constructor(private router: Router){}

  navigateRouter(path:string){
    this.router.navigate(['/catalogue'+path])
  }

}
