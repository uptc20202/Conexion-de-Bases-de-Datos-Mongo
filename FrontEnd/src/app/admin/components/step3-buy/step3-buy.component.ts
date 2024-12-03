  import { Component, Input, OnInit } from '@angular/core';
  import { Route, Router } from '@angular/router';
  import { SalesService } from 'src/app/api/services/Sales/sales.service';
import { AddressService } from 'src/app/api/services/address/address.service';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';
import { LoginService } from 'src/app/api/services/login/login.service';

  @Component({
    selector: 'app-step3-buy',
    templateUrl: './step3-buy.component.html',
    styleUrls: ['./step3-buy.component.scss']
  })
  export class Step3BuyComponent implements OnInit {
    addresses: any[] = [];
    addressByEdit:any;
    selectedAddressIndex: number = -1;

    @Input() calculateSubtotal: string|number ="";
    @Input() calculateTotal: string|number="";
    @Input() shippingCost: string|number="";
    @Input() articles: any[] = [];

    stadeLogin:boolean = true;
    userNoLogin: any;
    stadeCreateAddress:boolean = false;

    constructor(private salesService: SalesService, private route: Router,
      private loginService:LoginService,private articleService:ArticlesService,
       private addressService:AddressService) { }

    ngOnInit(): void {

      this.loginService.stadeLogin.subscribe( stade => this.stadeLogin = stade);

      if(this.stadeLogin){
        this.addresses = this.addressService.getAddressesStorage()

        this.addressService.addresses.subscribe(addresses => this.addresses = addresses);
      }


      /*
      const user = localStorage.getItem('user');
      if(user){
        const userObj = JSON.parse(user);
        if (userObj.shiping_address && Array.isArray(userObj.shiping_address)) {
          this.addresses = userObj.shiping_address
            .map((address: any) => ({
              ...address,
              selected: false
            }));
        } else {
          console.error('Error: shiping_address is not in the expected format.');
        }
      }*/
    }

    selectAddress(index: number): void {
      // Desmarcar la dirección previamente seleccionada, si existe
      if (this.selectedAddressIndex !== -1) {
        this.addresses[this.selectedAddressIndex].selected = false;
      }

      // Marcar la dirección seleccionada
      this.addresses[index].selected = true;
      this.selectedAddressIndex = index;
    }

    continueNoLogin(){

      this.selectedAddressIndex = 0;
      const saleData = this.createBodyShopNoLogin(this.userNoLogin);

      this.salesService.addSale(saleData).subscribe(response => {
        console.log('Sale created successfully:', response);
        const saleId = response.newSale._id;
        this.redirectToWhatsApp(saleId);
        this.route.navigate(['/sale/'+saleId]);
      }, error => {
        console.error('Error creating sale:', error);
      });
    }

    continueToPayment(): void {

      if(!this.stadeLogin){
        this.continueNoLogin();
        return;
      }

      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);

        const saleData = this.createBodyShop(user);

        this.salesService.addSale(saleData).subscribe(response => {
          console.log('Sale created successfully:', response);
          const saleId = response.newSale._id;
          this.redirectToWhatsApp(saleId);
          if(this.stadeLogin){
            this.route.navigate(['/sale/'+saleId]);
          }else{
            this.route.navigate(['/sale/nologin/'+saleId]);
          }
        }, error => {
          console.error('Error creating sale:', error);
        });
      }

    }

    createBodyShop(user:any){

      const saleData = {
        "user_id": user._id,
        "articles": this.articles.map(article => ({
          "article_id": article.productId,
          "size": article.size,
          "quantity": article.quantity
        })),
        "statusSale": "CONFIRMADA",
        "address_id": this.addresses[this.selectedAddressIndex]._id
      };


      return saleData;
    }

    createBodyShopNoLogin(user:any){
      const saleData = {
        "user": user,
        "articles": this.articles.map(article => ({
          "article_id": article.productId,
          "size": article.size,
          "quantity": article.quantity
        })),
        "statusSale": "CONFIRMADA",
        "address": this.addresses[this.selectedAddressIndex]
      };

      return saleData;
    }


    redirectToWhatsApp(saleId: string): void {
      const whatsappLink = `https://api.whatsapp.com/send?phone=573108746952&text=Deseo%20completar%20mi%20compra%20con%20referencia%20${saleId}`;
      window.open(whatsappLink, '_blank');
      this.articleService.clearCart();
    }
  }
