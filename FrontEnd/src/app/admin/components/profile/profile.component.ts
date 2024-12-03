import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UpdateUserService } from 'src/app/api/services/updateUser/update-user.service';
import { User } from 'src/app/models/user.model';
import { PopMessageComponent } from '../pop-message/pop-message.component';

  @Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
  })
  export class ProfileComponent implements OnInit {

    @ViewChild(PopMessageComponent) popMessageComponent!: PopMessageComponent;
    showSuccessMessage: boolean = false;
    messagePopAd: string = "error";
    typeOfAlert: string = "error";

    // Variables para los valores de los campos
    name: string = '';
    idNumber: string = '';
    contact: string = '';
    birthDate: string = '';

    lastName: string = '';
    gender: string = '';
    email: string = '';
    userUp: User | undefined;

    // Variable para controlar si se está en modo de edición
    isEditing: boolean = false;

    @Input() mode: 'profile' | 'shop' = 'profile';
    @Output() user: EventEmitter<any> = new EventEmitter<any>;

    constructor(private updateUserService : UpdateUserService) {}

    // Alternar entre modo de edición y modo de visualización
    toggleEditMode(): void {

      if (this.isEditing) {
        this.updateUser();
      }

      this.isEditing = !this.isEditing;
    }

    dataUserShop(){
      this.userUp = new User({});
      this.changeDataUser();
      this.user.emit(this.userUp);
    }

    updateUser() {

      if(!this.validateFields()){
        return;
      }

      if(this.mode=='shop'){
        this.dataUserShop();
        return;
      }
      this.changeDataUser();
      this.updateUserService.updateUser(this.userUp).subscribe(
        (response) => {
          // Manejar respuesta exitosa
          this.noShowMessagePopAd('Usuario actualizado con éxito:', 'check');
          const user = response;
          localStorage.setItem('user', JSON.stringify(user));
        },
        (error) => {
          // Manejar error
          this.noShowMessagePopAd('Error al actualizar el usuario:', 'error');
        }
      );
    }

    changeDataUser(){
      const updatedUserData = {
        first_name: this.name,
        birth_day: this.birthDate,
        gender: this.gender,
        number_phone: this.contact,
        second_name: this.lastName,
        number_document: this.idNumber,
      };

      this.userUp?.updateFields(updatedUserData);
    }




    ngOnInit(): void {

      if(this.mode=='shop'){
        this.isEditing = true
      }

      // Cargar el objeto de usuario desde el almacenamiento local
      const userJson = localStorage.getItem('user');
      if (userJson) {
        // Parsear el JSON para obtener el objeto de usuario
        const user = JSON.parse(userJson);
        this.userUp = new User(user);

        // Asignar los valores a las variables del componente
        this.name = user.first_name; // Combinar nombres
        this.idNumber = user.number_document;
        this.contact = user.number_phone;

        if(user.birth_day){
          this.birthDate = user.birth_day.slice(0, 10); // En formato ISO
        }

        this.lastName = user.second_name; // Puedes agregar esta propiedad si existe
        this.gender = user.gender;
        this.email = user.email;
      }
    }


    //Mensajes de exito o error
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
      if (!this.validateField('Nombre', this.name, /^[a-zA-Z\s]+$/)) return false;
      if (!this.validateField('Documento', this.idNumber, /^[0-9]{8,10}$/)) return false;
      if (!this.validateField('Contacto', this.contact, /^[0-9]{10}$/)) return false;
      if (!this.validateField('Fecha de Nacimiento', this.birthDate, /^\d{4}-\d{2}-\d{2}$/)) return false;
      if (!this.validateField('Apellido', this.lastName, /^[a-zA-Z\s]+$/)) return false;
      if (!this.validateField('Genero', this.gender, /^(M|F|O)$/i)) return false;
      if (!this.validateField('Correo', this.email, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) return false;

      return true;
    }

    validateField(fieldName: string, value: string, regex: RegExp): boolean {
      if (!regex.test(value)) {
        this.noShowMessagePopAd(`${fieldName} es invalido`, "error");
        return false;
      }
      return true;
    }


}
