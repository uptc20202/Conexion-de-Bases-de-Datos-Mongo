import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent {
  constructor(private router: Router){}

  navigateRoute(path:string){
    this.router.navigate(['/catalogue/'+path]);
  }
}
