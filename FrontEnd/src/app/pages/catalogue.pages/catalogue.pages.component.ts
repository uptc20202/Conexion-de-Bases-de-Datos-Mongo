import { Component, ViewChild } from '@angular/core';
import { PopMessageComponent } from 'src/app/admin/components/pop-message/pop-message.component';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/api/services/catergory/category.service';

@Component({
  selector: 'app-catalogue.pages',
  templateUrl: './catalogue.pages.component.html',
  styleUrls: ['./catalogue.pages.component.scss']
})
export class CataloguePagesComponent {
  articles: any[] = [];
  @ViewChild(PopMessageComponent) popMessageComponent!: PopMessageComponent;

  showSuccessMessage: boolean = false;
  messagePopAd: string = "error";
  typeOfAlert: string = "error";

  categories: any;
  order:string= 'emply';

  constructor(private articleService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();

    console.log(this.categories)
    this.fillProducts();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      resolve =>{
        this.categories = resolve;
      },error=>{
         console.error(error);
      });
  }

  fillProducts(){
    this.route.paramMap.subscribe(params => {
      const gender = params.get('gender'); // Obtener el parámetro 'gender' de la URL
      const category = params.get('category');
      const searchParams = params.get('data');

      // Llamar al método correspondiente del servicio dependiendo del valor de 'gender'
      if (gender && gender.toUpperCase() === 'MALE') {
        this.getArticlesByGender('M');
      } else if (gender && gender.toUpperCase() === 'FEMALE') {
        this.getArticlesByGender('F');
      }else if(category){
        this.getByCategory(category);
      }else if(searchParams){
        this.getByName(searchParams);
      }else{
        this.getAllArticles();
      }
    });
  }

  getByName(name:string){
    this.articleService.getArticlesByName(name).subscribe(
      resolve => {
        this.articles = resolve;
      },
      error =>{
        console.error(error);
      }
    );
  }


  getByCategory(category:string){
    this.articleService.getArticlesByCategoryName(category).subscribe(
      resolve =>{
        this.articles = resolve;
      },
      error =>{
        console.error(error);
    });
  }

  private getAllArticles(){
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    },
    (error) => {
      console.error('Error al registrarse');
      this.noShowMessagePopAd("Error al cargar productos ", "error");
    });
  }

  private getArticlesByGender(gender: string): void {
    this.articleService.getArticlesByGender(gender).subscribe(
      data => {
        this.articles = data;
      },
      error => {
        console.error('Error al cargar productos:', error);
        this.noShowMessagePopAd("Error al cargar productos", "error");
      }
    );
  }

  noShowMessagePopAd(message_err: string, typeOfAlert: string){
    this.typeOfAlert = typeOfAlert;
    this.popMessageComponent.typeOfAlert = typeOfAlert;
    this.messagePopAd = message_err;
    this.popMessageComponent.update();
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  navigateRoute(path:string){
    this.router.navigate(['/catalogue/'+path]);
  }

  sortByPrice() {
    if(this.order == 'emply'){
      return;
    }

    this.articles.sort((a, b) => {
      const priceA = a.retail_price;
      const priceB = b.retail_price;
      if(this.order == 'desc'){
        return this.order == 'desc' ? priceB - priceA : priceA - priceB;
      }
      return this.order == 'asc' ? priceA - priceB : priceB - priceA;
    });
  }
}
