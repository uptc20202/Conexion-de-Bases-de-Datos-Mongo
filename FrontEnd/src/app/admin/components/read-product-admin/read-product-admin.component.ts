import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';
import { PopMessageComponent } from '../pop-message/pop-message.component';

interface InputData {
  available: boolean;
  category: string;
  code_article: string;
  color: string;
  createdAt: string;
  description_article: string;
  gender: string;
  images: string[];
  name_article: string;
  retail_price: number;
  stock: any[];
  updatedAt: string;
  wholesale_price: number;
  medium_price: number;
  _id: string;
}

interface OutputData {

    category: string;
    code_article: string;
    color: string;
    description: string;
    gender: string;
    images: string[];
    medium_price: number;
    name_article: string;
    retail_price: number;
    stock: { [size: string]: number };
    wholesale_price: number;
    _id: string;
}

@Component({
  selector: 'app-read-product-admin',
  templateUrl: './read-product-admin.component.html',
  styleUrls: ['./read-product-admin.component.scss']
})
export class ReadProductAdminComponent implements OnInit {

  stadeEdit: boolean = false;
  articles: any[] = [];
  filteredArticles: any[] = []; // Array filtrado a mostrar en la tabla
  filter: any = { code: '', name: '', category: '' };
  editProduct: any;

  showSuccessMessage: boolean = false;
  messagePopAd: string = "error";
  typeOfAlert: string = "error";
  @ViewChild(PopMessageComponent) popMessageComponent!: PopMessageComponent;

  categories: any[]  = [];

  constructor(private articleService: ArticlesService, private router: Router,
    private categoriaService: ArticlesService) { }

  ngOnInit(): void {

    this.loadCategories();
    this.getAllArticles();
  }


  loadCategories(): void {
    this.categoriaService.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories.map(category => ({
          _id: category._id,
          name_category: category.name_category
        }));

      },
      error => {
        this.noShowMessagePopAd('Error al obtener las categorías', 'error');
      }
    );
  }

  getCategoryName(categoryId: string): string {
    const foundCategory = this.categories.find(cat => cat._id === categoryId);
    return foundCategory ? foundCategory.name_category : 'Sin categoría';
  }

  transformData(input: InputData): OutputData {
    interface InputData {
      available: boolean;
      category: string;
      code_article: string;
      color: string;
      createdAt: string;
      description_article: string;
      gender: string;
      images: string[];
      name_article: string;
      retail_price: number;
      medium_price: number;
      stock: { size: string; quantity: number }[]; // Correctly specify the stock property as an array of objects with size and quantity
      updatedAt: string;
      wholesale_price: number;
      _id: string;
    }

      const output: OutputData = {
          _id: input._id,
          category: input.category,
          code_article: input.code_article,
          color: input.color,
          description: '', // Puedes asignar aquí la descripción deseada si la propiedad existe en el objeto de entrada
          gender: input.gender,
          images: input.images,
          medium_price: input.medium_price,
          name_article: input.name_article,
          retail_price: input.retail_price,
          wholesale_price: input.wholesale_price,
          stock: {}, // Inicializamos el objeto de stock vacío para llenarlo a continuación
      };

      // Mapeo del stock del formato array al formato objeto por tamaño
      if (input.stock && Array.isArray(input.stock)) {
          input.stock.forEach((item) => {
              if (item.size && item.quantity) {
                  output.stock[item.size] = item.quantity;
              }
          });
      }
      return output;
  }

  getAllArticles(): void {
    this.articleService.getArticles().subscribe(
      (data: any[]) => {
        this.articles = data;
        this.setCategoryNames();
        this.filteredArticles = this.articles;
      },
      (error) => {
        this.noShowMessagePopAd('Error al obtener los productos', 'error');
      }
    );
  }

  setCategoryNames(){
    this.articles = this.articles.map(
      article => {
        return{
          ...article,
          name_category: this.getCategoryName(article.category)
        }
      }
    );
    console.log(this.articles[this.articles.length-1])
  }

  getTotalQuantity(stock: any[]): number {
    return stock.reduce((total, item) => total + item.quantity, 0);
  }

  applyFilter(): void {
    // Aplicar el filtro localmente al array de artículos
    this.filteredArticles = this.articles.filter(article =>
      article.code_article?.toLowerCase().includes(this.filter.code.toLowerCase()) &&
      article.name_article?.toLowerCase().includes(this.filter.name.toLowerCase()) &&
      article.name_category?.toLowerCase().includes(this.filter.category.toLowerCase())
    );
  }

  viewArticle(article: any): void {
    console.log('Ver artículo:', article);
  }

  editArticle(article: any): void {
    this.editProduct = this.transformData(article);
    this.stadeEdit = true;
  }

  deleteArticle(article: any): void {
    if (confirm(`¿Estás seguro de que deseas eliminar el artículo "${article.name_article}"?`)) {
      this.articleService.deleteArticle(article._id).subscribe(
        (response: any) => {
          this.noShowMessagePopAd('Artículo eliminado correctamente', 'check');
          // Actualizar la lista de artículos después de la eliminación
          this.articles = this.articles.filter(a => a._id !== article._id);
          this.applyFilter();
        },
        (error) => {
          this.noShowMessagePopAd('Error al eliminar el artículo', 'error');
        }
      );
    }
  }

  addProductList(product:any){
    this.articles.push(product);
    console.log("Add :",product)

    if(product){
      this.noShowMessagePopAd('Producto creado exitosamente', 'check');
    }
  }

  toEdit(stade:boolean) {
    this.stadeEdit = !this.stadeEdit;

    this.editProduct = {
      category: '',
      images: [],
      code_article: '',
      name_article: '',
      gender: '',
      retail_price: 0,
      medium_price: 0,
      wholesale_price: 0,
      color: '',
      stock: {
      },
      description: ''
    };

    if(stade){
      this.noShowMessagePopAd('Lista de productos actualizada', 'check');
    }
  }

  routeProduct(routerLink: string) {
    this.router.navigate(['/catalogue/product/'+routerLink]);
  }

  noShowMessagePopAd(message_err: string, typeOfAlert: 'check' | 'error'){
    this.typeOfAlert = typeOfAlert;
    this.popMessageComponent.typeOfAlert = typeOfAlert;
    this.messagePopAd = message_err;
    this.popMessageComponent.update();
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
 }

}
