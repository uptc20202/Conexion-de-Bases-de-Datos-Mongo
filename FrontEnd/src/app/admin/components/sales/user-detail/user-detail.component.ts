import { Component, Input } from '@angular/core';
import { SalesService } from 'src/app/api/services/Sales/sales.service';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  @Input() id_sale: string = "";
  sale: any = {
    "_id": "",
    "user_id": "",
    "address_id": "",
    "articles": [
        {
            "article_id": "",
            "size": "",
            "quantity": 0,
            "total": 0,
            "_id": "",
            "details": {
                "name_article": "",
                "images": ["https://via.placeholder.com/150"]
            }
        },
        {
            "article_id": "",
            "size": "",
            "quantity": 0,
            "total": 0,
            "_id": "",
            "details": {
                "name_article": "",
                "images": ["https://via.placeholder.com/150"]
            }
        }
    ],
    "totalSale": 0,
    "statusSale": "",
    "createdAt": "",
    "updatedAt": "",
    "address": {
        "department": "",
        "municipality": "",
        "address": "",
        "neighborhood": "",
        "additional_info": "",
        "name_addressee": "",
        "number_phone": "",
        "_id": ""
    }
  };

  constructor(private salesService: SalesService, private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.getSaleById();
  }



  getSaleById(){
    if(this.id_sale!=""){
      this.salesService.getSaleById(this.id_sale).subscribe(
        (response) => {
          this.sale = response;
          this.loadArticlesDetails();
        },
        (error) => {
          console.error('Error al obtener la venta:', error);
        }
      );
    }
  }

  loadArticlesDetails(): void {
      this.sale.articles.forEach((article: any) => {

        this.articlesService.getArticleById(article.article_id).subscribe(
          (articleDetails: any) => {
            article.details = articleDetails;
            console.log(this.sale);
          },
          (error: any) => {
            console.error(`Error fetching details for article ID ${article.article_id}:`, error);
          }
        );
      });
  }


  calculateSubtotal(): number {
    let subtotal = 0;
    this.sale.articles.forEach((article: any) => {
      subtotal += article.total;
    });
    return subtotal;
  }

  calculateShippingCost(): number {
    // You can implement your shipping cost calculation logic here
    return 10000;
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateShippingCost();
  }

  getOrderStatusClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'ENTREGADO':
        return 'status-delivered';
      case 'CANCELADO':
        return 'status-cancelled';
      case 'EN PREPARACIÓN':
        return 'status-preparing';
      case 'PREPARADO':
        return 'status-prepared';
      case 'CONFIRMADO':
        return 'status-confirmed';
      case 'CONFIRMADA':
        return 'status-pending';
      default:
        return '';
    }
  }

  redirectToWhatsApp(): void {
    const whatsappLink = `https://api.whatsapp.com/send?phone=573204118057&text=Deseo%20completar%20mi%20compra%20con%20referencia%20${this.id_sale}`;
    window.open(whatsappLink, '_blank');
  }

}
