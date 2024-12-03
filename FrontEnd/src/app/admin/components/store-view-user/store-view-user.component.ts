import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoresService } from 'src/app/api/services/stores/stores.service';

@Component({
  selector: 'app-store-view-user',
  templateUrl: './store-view-user.component.html',
  styleUrls: ['./store-view-user.component.scss']
})
export class StoreViewUserComponent {
  store: any;

  constructor(private route: ActivatedRoute, private storesService:StoresService) {}

  ngOnInit(): void {
    const storeId = this.route.snapshot.paramMap.get('idStore');
    if(storeId){
      this.getStoreDetails(storeId);
      console.log(storeId)
    }

  }

  getStoreDetails(storeId: string): void {
    this.storesService.getStoreById(storeId).subscribe(
      response => {
        this.store = response;
        console.log(response)
      },error =>{console.log(error)}
    );

  }
}
