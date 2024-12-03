import { Component } from '@angular/core';
import { SalesService } from 'src/app/api/services/Sales/sales.service';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';

@Component({
  selector: 'app-sales-orders',
  templateUrl: './sales-orders.component.html',
  styleUrls: ['./sales-orders.component.scss']
})
export class SalesOrdersComponent {

  editState: boolean = false;
  idSaleView: string = "";

  sales: any[] = [];

  constructor(private salesService: SalesService, private articlesService: ArticlesService) { }

  ngOnInit(): void {

    this.getOrders();
  }

  getOrders(){
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);

      this.salesService.getSalesByUser(user._id).subscribe(
        (data: any) => {
          this.sales = data;
          this.loadArticlesDetails();
        },
        (error: any) => {
          console.error('Error fetching sales:', error);
        }
      );

    }
  }

  loadArticlesDetails(): void {
    this.sales.forEach(sale => {
      sale.articles.forEach((article: any) => {

        this.articlesService.getArticleById(article.article_id).subscribe(
          (articleDetails: any) => {
            article.details = articleDetails;
          },
          (error: any) => {
            console.error(`Error fetching details for article ID ${article.article_id}:`, error);
          }
        );
      });
    });
  }

  /**
   * Logic Field GUI
   */

  getShortId(id: string): string {
    if (!id) {
      return ''; // O cualquier valor por defecto que quieras retornar
    }
    if(id.length>=6){
      return id.substring(0, 6);
    }
    return id;
  }

  getTotalQuantity(articles: any[]): number {
    return articles.reduce((total, article) => total + article.quantity, 0);
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

  viewSale(id: string){
    this.idSaleView = id;
  }

}
