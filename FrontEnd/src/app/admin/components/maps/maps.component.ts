import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoresService } from 'src/app/api/services/stores/stores.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit{

  stores:any[] = [];

  constructor(private stroresService: StoresService,private router:Router){}

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(){
    this.stroresService.getStores().subscribe(
      response =>{
        this.stores = response;
      },
      error =>{
        console.log(error)
      }
    );
  }

  viewStore(id:string){
    this.router.navigate(['/stores/'+id]);
  }

}
