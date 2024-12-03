import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apply-offer.pages',
  templateUrl: './apply-offer.pages.component.html',
  styleUrls: ['./apply-offer.pages.component.scss']
})
export class ApplyOfferPagesComponent implements OnInit{

  constructor(private routeActive: ActivatedRoute){}

  viewJobId: string | null= "";

  ngOnInit(): void {
    this.routeActive.paramMap.subscribe(
      params =>{
        this.viewJobId = params.get('id');
      }
    );
  }


}
