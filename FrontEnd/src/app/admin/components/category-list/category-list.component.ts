import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';
import { CategoryService } from 'src/app/api/services/catergory/category.service';
import { PopMessageComponent } from '../pop-message/pop-message.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent implements OnInit {

  stadeEdit:boolean = false;
  editCategory: string= "";
  categories: any[] = [];

  showSuccessMessage: boolean = false;
  messagePopAd: string = "error";
  typeOfAlert: string = "error";
  @ViewChild(PopMessageComponent) popMessageComponent!: PopMessageComponent;


  constructor(private articlesService: ArticlesService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.articlesService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error) => {
        this.noShowMessagePopAd('Error al obtener las categorías:', 'error');
      }
    );
  }

  toEdit(stade:boolean) {
    this.stadeEdit = !this.stadeEdit;

    if(stade){
      this.noShowMessagePopAd('Lista actualizada con éxito', 'check');
    }

  }

  toEditCategory(category: any): void {
    this.editCategory = category._id;
    this.stadeEdit = true;
  }

  deteleCategory(category: any): void{
    if(confirm("¿Desea eliminar la categoria "+category.name_category + " ?")){
      this.categoryService.deleteCategory(category._id).subscribe(
        (resolve) => {
          this.categories = this.categories.filter(categoryFilter => categoryFilter._id != category._id)
        },
        (error) => {
          alert("Error al eliminar categoria");
        }
      );
    }
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
