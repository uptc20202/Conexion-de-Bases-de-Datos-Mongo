import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import { CategoryService } from 'src/app/api/services/catergory/category.service';
import { CloudinaryService } from 'src/app/api/services/cloudinary/cloudinary.service';
import { PopMessageComponent } from '../pop-message/pop-message.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @ViewChild(PopMessageComponent) popMessageComponent!: PopMessageComponent;

  urlImageUpload: string = "https://thumbs.dreamstime.com/b/sin-foto-ni-icono-de-imagen-en-blanco-cargar-imágenes-o-falta-marca-no-disponible-próxima-señal-silueta-naturaleza-simple-marco-215973362.jpg";

  category: any= {
    name_category: '',
    description_category: '',
    url_icon: this.urlImageUpload,
    url_image: this.urlImageUpload,
    url_size_guide_fem: this.urlImageUpload,
    url_size_guide_male: this.urlImageUpload
  };

  @Input() categoryId: string = "";

  @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>;
  @Output() newCategory: EventEmitter<any> = new EventEmitter<any>;

  showSuccessMessage: boolean = false;
  messagePopAd: string = "error";
  typeOfAlert:  'error' | 'check' = 'error';

  constructor(private uploadService: CloudinaryService,
    private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getCategoryById();
  }

  validateFields(): boolean{
    if(!this.category.name_category){
      this.noShowMessagePopAd("Ingresa un nombre de categoria ", 'error');
      return false;
    }

    if(!this.category.description_category){
      this.noShowMessagePopAd("Ingresa una descripción", 'error');
      return false;
    }

    if(this.category.url_icon==this.urlImageUpload ){
      this.noShowMessagePopAd("Se requiere ingresar un icono para la categoria", 'error');
      return false;
    }

    return true;
  }

  getCategoryById(): void {
    if(this.categoryId!=""){
      this.categoryService.getCategoryById(this.categoryId).subscribe({
        next: (data) => this.category = data,
        error: (err) => console.error('Error retrieving category:', err)
      });
    }
  }

  viewImage(url: string): void {
    if(url !=this.urlImageUpload){
      window.open(url, '_blank');
    }
  }


  uploadImg(){
    return Promise.all([
    this.upload(this.category.url_icon)
      .then(resolve =>{
        this.category.url_icon = resolve;
      }).catch(
        error =>{
          console.error(error);
        }
      ),


      this.upload(this.category.url_image)
      .then(resolve =>{
        this.category.url_image = resolve;
      }).catch(
        error =>{
          console.error(error);
        }
      ),

      this.upload(this.category.url_size_guide_fem)
      .then(resolve =>{
        this.category.url_size_guide_fem = resolve;
      }).catch(
        error =>{
          console.error(error);
        }
      ),

      this.upload(this.category.url_size_guide_male)
      .then(resolve =>{
        this.category.url_size_guide_male = resolve;
      }).catch(
        error =>{
          console.error(error);
        }
      ),
    ]);
  }

  upload(img: any): Promise<any>{
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    return new Promise<any>((resolve, reject) => {

      if (!urlRegex.test(img)) {
        const data = new FormData();
        data.append('file', img);
        data.append('upload_preset', 'test-data');
        data.append('cloud_name', 'ds9zdlkcc');
        data.append('api_key', '467869935517896');

          this.uploadService.updloadImg(data).subscribe({
            next: (response: any) => {
              const imageUrl = response.url;
              //return imageUrl;
              console.log(imageUrl);
              resolve(imageUrl);

            },
            error: (e: any) => {
              console.log(e);
              reject('Error al subir imagen');
            }

        });
      }else{
        console.log('Imagen ya es URL')
        resolve(img);
      }


    });


  }

  onFileChange(event: any,space: string) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      // Verificar si el archivo es una imagen
      if (file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          switch(space){
            case 'url_icon':
              this.category.url_icon = e.target.result
            break;
            case 'url_image':
              this.category.url_image = e.target.result
            break;
            case 'url_size_guide_fem':
              this.category.url_size_guide_fem = e.target.result
            break;
            case 'url_size_guide_male':
              this.category.url_size_guide_male = e.target.result
            break;
            default:
              console.log("Perdida "+e.target.result);
            break;
          }
        };
        reader.readAsDataURL(file); // Convertir el archivo a una URL base64
      } else {
        alert('Por favor, selecciona un archivo de imagen válido.');
      }
    }
  }

   /**
    * Services of Update and Create
    *  */

   updateCategory(): void {

    if(!this.validateFields()){
      return;
    }

    this.uploadImg().then(resolve =>{
      console.log("Termino")
      if (this.categoryId) {
        console.log(this.categoryId)
        this.categoryService.updateCategory(this.categoryId, this.category).subscribe({
          next: (data) => {
            console.log('Categoría actualizada:', data);
            // Lógica adicional después de guardar la categoría, como navegar a otra página
            this.back.emit(true);
            //this.router.navigate(['/admin/products']);
          },
          error: (err) => console.error('Error actualizando categoría:', err)
        });
      } else {
        this.createCategory();
      }

    }).catch(error=>{
      console.error(error);
    });

  }



  createCategory(){
    this.categoryService.createCategory(this.category).subscribe({
      next: (resolve) => {
        console.log(resolve);
        this.newCategory.emit(resolve);
        this.back.emit(true)
      },
      error: (err) =>{
        alert("No pudo ser creada la categoria")
        console.log(err);
      }
    });
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
