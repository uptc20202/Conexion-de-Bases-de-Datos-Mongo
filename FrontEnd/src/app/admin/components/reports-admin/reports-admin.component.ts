import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/api/services/Sales/sales.service';

@Component({
  selector: 'app-reports-admin',
  templateUrl: './reports-admin.component.html',
  styleUrls: ['./reports-admin.component.scss']
})
export class ReportsAdminComponent implements OnInit{

  sales: any;
  salesQuantity: number = 0;
  netSalesValue: number = 0;
  soldProducts: any[] = [];

  constructor(private salesService: SalesService){}

  ngOnInit(): void {
    this.loadSales("month");
  }

  loadSales(option : string){
    switch(option){
      case "day":
        this.salesByDay();
        break;
      case "month":
        this.salesByMonth();
        break;
      case "week":
        this.salesByWeek();
        break;
      default:
        break;
    }
  }

  salesByDay(){
    this.salesService.reportByDay().subscribe(
      response =>{
        this.sales = response.ventasDia;
        this.salesQuantity = response.ventasDia[0]?.quantitySales;
        this.netSalesValue = response.ventasDia[0]?.totalValue;
        //this.soldProducts = response.ventasDia[0]?.sales;
        this.fillProducts(response.ventasDia[0]?.sales);
      },error =>{
        alert("Error al cargar ventas")
        console.error(error);
      }
    )
  }

  salesByMonth(){
    this.salesService.reportByMonth().subscribe(
      response =>{
        this.sales = response.ventasMes;
        this.salesQuantity = response.ventasMes[0]?.quantitySales;
        this.netSalesValue = response.ventasMes[0]?.totalValue;
        //this.soldProducts = response.ventasMes[0]?.sales;
        this.fillProducts(response.ventasMes[0]?.sales);
      },error =>{
        alert("Error al cargar ventas")
        console.error(error);
      }
    )
  }

  salesByWeek(){
    this.salesService.reportByWeek().subscribe(
      response =>{
        this.sales = response.ventasSemana;
        this.salesQuantity = response.ventasSemana[0]?.quantitySales;
        this.netSalesValue = response.ventasSemana[0]?.totalValue;
        //this.soldProducts = response.ventasSemana[0]?.sales;
        this.fillProducts(response.ventasSemana[0]?.sales);
      },error =>{
        alert("Error al cargar ventas")
        console.error(error);
      }
    )
  }

  fillProducts(sales:any){
    this.soldProducts = [];

        // Recorre cada arreglo en sales y concatena sus elementos en soldProducts
      this.soldProducts = sales.reduce((accumulator: string | any[], currentArray: any) => {
      return accumulator.concat(currentArray.articles);
    }, []);

    console.log(this.soldProducts);
  }
}
