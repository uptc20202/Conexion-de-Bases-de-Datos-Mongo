import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';
import { CloudinaryService } from 'src/app/api/services/cloudinary/cloudinary.service';
import { PopMessageComponent } from '../pop-message/pop-message.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent  implements OnInit {

  @Output() back: EventEmitter<boolean> = new  EventEmitter<boolean>;
  @Output() productCreate: EventEmitter<any> = new EventEmitter<any>;
  @Input() product: any = {
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

  uploadedImageUrls: string[] = [];

  categories: any[]  = [];

  showSuccessMessage: boolean = false;
  messagePopAd: string = "error";
  typeOfAlert: string = "error";
  @ViewChild(PopMessageComponent) popMessageComponent!: PopMessageComponent;


  constructor(private uploadService: CloudinaryService,
    private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.articleService.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories.map(category => ({
          _id: category._id,
          name_category: category.name_category
        }));

      },
      error => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }


  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      // Verificar si el archivo es una imagen
      if (file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.product.images.push(e.target.result); // Agregar la URL de la imagen al array
        };
        reader.readAsDataURL(file); // Convertir el archivo a una URL base64
      } else {
        this.noShowMessagePopAd('Por favor, selecciona un archivo de imagen válido.', 'error');
      }
    }
  }


  deleteImage(index: number) {
    this.product.images.splice(index, 1); // Eliminar la imagen del array según su índice
  }

  upload(): Promise<boolean> {

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    return new Promise<boolean>((resolve, reject) => {
      if (this.product.images.length === 0) {
        reject('No hay imágenes para subir.');
        return;
      }

      const uploadPromises: Promise<string>[] = [];

      this.product.images.forEach((file_data: any) => {

        if (typeof file_data === 'string' && urlRegex.test(file_data)) {
          // Es una URL válida, añadir directamente a uploadedImageUrls
          this.uploadedImageUrls.push(file_data);
          return; // Saltar a la siguiente iteración del bucle
        }

        const data = new FormData();
        data.append('file', file_data);
        data.append('upload_preset', 'test-data');
        data.append('cloud_name', 'ds9zdlkcc');
        data.append('api_key', '467869935517896');

        // Agregar la promesa de subida de imagen al array
        const uploadPromise = new Promise<string>((innerResolve, innerReject) => {

          this.uploadService.updloadImg(data).subscribe({
            next: (response: any) => {
              const imageUrl = response.url;
              this.uploadedImageUrls.push(imageUrl);
              innerResolve(imageUrl);
            },
            error: (e: any) => {
              console.log(e);
              innerReject('Error al subir imagen');
            }
          });
        });

        uploadPromises.push(uploadPromise);
      });

      // Esperar a que todas las promesas de subida se resuelvan
      Promise.all(uploadPromises).then(() => {
        resolve(true);
      }).catch(error => {
        reject(error);
      });
    });
  }

  createArticle(): void {

    if (!this.validateData()) {
      return;
    }

    this.upload().then(() => {

      const articleData = {

        code_article: this.product.code_article,
        name_article: this.product.name_article,
        retail_price: this.product.retail_price,
        wholesale_price: this.product.wholesale_price,
        medium_price: this.product.medium_price,
        description_article: this.product.description,
        images: this.uploadedImageUrls,
        available: true,
        stock: Object.entries(this.product.stock),
        gender: this.product.gender,
        category: this.product.category,
        color: this.product.color
      };

      if(this.product._id){
        this.updateProduct(this.product._id, articleData);
        return;
      }

      // Realizar la solicitud HTTP POST para crear el artículo
      this.articleService.addArticle(articleData).subscribe({
        next: (response: any) => {
          this.productCreate.emit(response);
          this.noShowMessagePopAd('Artículo creado con éxito:', 'check');

          console.log('Eroor ra')
          console.log(response)
          this.back.emit(true);
        },
        error: (error: any) => {
          this.noShowMessagePopAd('Error al crear el artículo:', 'error');
          console.error('Error al crear el artículo:', error);
        }
      });

      }).catch(error => {
        console.error('Error al subir imágenes:', error);
      });


  }

  updateProduct(_id: string,articleData: any){
    this.articleService.updateArticle(_id,articleData).subscribe(
      (response) => {
        this.noShowMessagePopAd('Producto Actualizado', 'check');
        this.back.emit(true);
        //this.productCreate.emit(response);
      },
      (error) => {
        alert("Error en la edición del producto");
        console.log(error);
      }
    );
  }

  updateStockValues(): void {
    if (this.product && this.product.stock) {
      Object.keys(this.product.stock).forEach(size => {
        if (this.product.stock[size] < 1 && this.product.stock[size]!=0) {

          this.product.stock[size] = 1;
        }
        if(size == 'size'){
          this.product.stock[size] = 0;
        }
      });
    }
  }

    /**
   * Verifica la completitud de la información del producto y procede con la creación del artículo.
   * @returns Un booleano que indica si el todos los campos fueron diligenciados (true) o no (false).
   */
  validateData(): boolean {
      this.updateStockValues();

      if (!this.product.name_article || this.product.name_article.trim() === '') {
        this.noShowMessagePopAd('Debes ingresar el nombre del artículo.', 'error');
        return false;
      }

      if (!this.product.category) {
        this.noShowMessagePopAd('Debes seleccionar una categoría.', 'error');
        return false;
      }

      if (!this.product.gender) {
        this.noShowMessagePopAd('Debes seleccionar un género.', 'error');
        return false;
      }

      if (this.product.images.length === 0) {
        this.noShowMessagePopAd('Debes cargar al menos una imagen.', 'error');
        return false;
      }

      const hasQuantity = Object.values(this.product.stock).some((qty: any) => Number(qty) > 0);
      if (!hasQuantity) {
        this.noShowMessagePopAd('Debes ingresar al menos una cantidad para una talla.', 'error');
        return false;
      }

      if (this.product.retail_price <= 0 ||
          this.product.wholesale_price <= 0 ||
          this.product.medium_price <= 0 )
      {
        this.noShowMessagePopAd('Debes ingresar el precios de venta.', 'error');
        return false;
      }

      if (this.product.retail_price <= 500 ||
        this.product.wholesale_price <= 500 ||
        this.product.medium_price <= 500 )
      {
        this.noShowMessagePopAd('Digite un precio con valor superior a $500', 'error');
        return false;
      }

      if(this.product.retail_price > 5000000 ||
        this.product.wholesale_price > 5000000 ||
        this.product.medium_price > 5000000 )
      {
        this.noShowMessagePopAd('El precio excede el valor máximo', 'error');
        return false;
      }

      return true;
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
