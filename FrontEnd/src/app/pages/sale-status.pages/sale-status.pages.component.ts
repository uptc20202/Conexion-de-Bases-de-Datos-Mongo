import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale-status.pages',
  templateUrl: './sale-status.pages.component.html',
  styleUrls: ['./sale-status.pages.component.scss']
})
export class SaleStatusPagesComponent implements OnInit{

  idSale: any = "";

  constructor(private routeActive: ActivatedRoute){}

  ngOnInit(): void{
    this.routeActive.paramMap.subscribe( params => {
      this.idSale = params.get('id');
    })
  }

}
