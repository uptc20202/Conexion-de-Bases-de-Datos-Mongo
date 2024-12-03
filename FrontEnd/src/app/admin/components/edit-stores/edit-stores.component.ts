import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/api/services/address/address.service';
import { CloudinaryService } from 'src/app/api/services/cloudinary/cloudinary.service';
import { StoresService } from 'src/app/api/services/stores/stores.service';
import { PopMessageComponent } from '../pop-message/pop-message.component';

@Component({
  selector: 'app-edit-stores',
  templateUrl: './edit-stores.component.html',
  styleUrls: ['./edit-stores.component.scss']
})
export class EditStoresComponent implements OnInit {
  @Input() storeId: string = '';
  @Input() mode: 'view' | 'edit' | 'create' = 'view'; // Modo del componente: ver, editar, crear
  @Output() storeUpdated: EventEmitter<any> = new EventEmitter<any>();

  @Input() store: any = {
    name_store: '',
    address: '',
    department: '',
    city: '',
    images: []
  };

  uploadedImageUrls: string[] = [];

  isViewMode: boolean = false;
  isEditMode: boolean = false;
  isCreateMode: boolean = false;

  departamentosAlmacenados: Set<string> = new Set<string>();
  departamentos: any[] = [];
  municipios: any[] = [];

  showSuccessMessage: boolean = false;
  messagePopAd: string = "error";
  typeOfAlert: string = "error";
  @ViewChild(PopMessageComponent) popMessageComponent!: PopMessageComponent;

  constructor(private storeService: StoresService, private router: Router,
    private uploadService: CloudinaryService,private addressService:AddressService
  ) { }

  ngOnInit(): void {
    this.getDepartamentos();
    this.isViewMode = this.mode === 'view';
    this.isEditMode = this.mode === 'edit';
    this.isCreateMode = this.mode === 'create';
    if (this.storeId && (this.isViewMode || this.isEditMode)) {
      this.getStoreById();
    }
  }

  getStoreById(): void {
    this.storeService.getStoreById(this.storeId).subscribe({
      next: (data) => {this.store = data; console.log(data) },
      error: (err) => this.noShowMessagePopAd('Error al obtener tienda', 'error')
    });
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    /*
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.store.images.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }*/


    if (files.length > 0) {
      const file = files[0];
      // Verificar si el archivo es una imagen
      if (file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedImageUrls.push(e.target.result); // Agregar la URL de la imagen al array
        };
        reader.readAsDataURL(file); // Convertir el archivo a una URL base64
      } else {
        this.noShowMessagePopAd('Por favor, selecciona un archivo de imagen válido.', 'error');
      }
    }
  }

  saveChanges(): void {
    if (!this.validateFields()) {
      return;
    }

    this.upload().then(() => {

    this.storeService.updateStore(this.store).subscribe({
      next: (data) => {
        this.noShowMessagePopAd('Tienda actualizada con éxito', 'check');
        this.storeUpdated.emit(data);
        this.router.navigate(['admin/stores']);
      },
      error: (err) => this.noShowMessagePopAd('Error al actualizar la tienda', 'error')
    });

    });
  }

  deleteImg(img:string){
    this.store.images = this.store.images.filter((image: string) => image != img);
  }

  saveStore(): void {
    if (!this.validateFields()) {
      return;
    }

    this.store.images = [];

    this.upload().then(() => {

      this.storeService.createStore(this.store).subscribe({
        next: (data) => {
          this.noShowMessagePopAd('Tienda creada con éxito', 'check');
          this.storeUpdated.emit(data);
        },
        error: (err) => this.noShowMessagePopAd('Error al crear tienda', 'error')
      });

    });

  }

  upload(): Promise<boolean> {

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    return new Promise<boolean>((resolve, reject) => {
      if (this.uploadedImageUrls.length === 0) {
        console.log('No hay imágenes para subir.');
        resolve(false);
        return;
      }

      const uploadPromises: Promise<string>[] = [];

      this.uploadedImageUrls.forEach((file_data: any) => {

        if (typeof file_data === 'string' && urlRegex.test(file_data)) {
          // Es una URL válida, añadir directamente a uploadedImageUrls
          this.store.images.push(file_data);
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
              this.store.images.push(imageUrl);
              innerResolve(imageUrl);
            },
            error: (e: any) => {
              console.log(e);
              this.noShowMessagePopAd('Error en el cargue de imagenes', 'error');
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

  onDepartamentoSelected(departamento: any): void {
    this.addressService.getMunicipiosByDepartamento(departamento).subscribe(
      (data) => {
        this.municipios = data.map((item) => item.municipio);
      },
      (error) => {
        this.noShowMessagePopAd(`Error al obtener municipios para ${departamento}:`, 'error');
      }
    );
  }

  getDepartamentos(): void {
    this.addressService.getAllDepartamentos().subscribe(
      (data) => {
        data.forEach((item) => {
          const departamento = item.departamento;
          if (!this.departamentosAlmacenados.has(departamento)) {
            this.departamentosAlmacenados.add(departamento); // Agregar departamento al conjunto de almacenados
            this.departamentos.push(departamento); // Agregar departamento a la lista para mostrar en el select
          }
        });
      },
      (error) => {
        this.noShowMessagePopAd('Error al obtener departamentos:', 'error');
      }
    );
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

 validateFields(): boolean {
    if (!this.store.name_store) {
      this.noShowMessagePopAd('Digite el nombre de la tienda.', 'error');
      return false;
    }
    if (!this.store.address) {
      this.noShowMessagePopAd('La dirección es obligatoria.', 'error');
      return false;
    }
    if (!this.store.department) {
      this.noShowMessagePopAd('El departamento es obligatorio.', 'error');
      return false;
    }
    if (!this.store.city) {
      this.noShowMessagePopAd('La ciudad es obligatoria.', 'error');
      return false;
    }
    return true;
  }

  viewImage(url: string): void {
    window.open(url, '_blank');
  }
}
