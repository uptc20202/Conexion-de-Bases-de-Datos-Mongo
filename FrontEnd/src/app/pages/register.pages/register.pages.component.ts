import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopMessageComponent } from 'src/app/admin/components/pop-message/pop-message.component';
import { UpdateUserService } from 'src/app/api/services/updateUser/update-user.service';

@Component({
  selector: 'app-register.pages',
  templateUrl: './register.pages.component.html',
  styleUrls: ['./register.pages.component.scss']
})
export class RegisterPagesComponent {

  @ViewChild(PopMessageComponent) popMessageComponent!: PopMessageComponent;

  showSuccessMessage: boolean = false;
  messagePopAd: string = "error";
  typeOfAlert: string = "error";

  name: string = '';
  idNumber: string = '';
  contact: string = '';
  birthDate: string = '';
  lastName: string = '';
  gender: string = '';
  typeDocumen: string = '';

  constructor(private updateUserService : UpdateUserService, private router: Router) {}

  changeDataUser(){
    const userJson = localStorage.getItem('user');
    if(userJson){
      const  user = JSON.parse(userJson);
        const updatedUserData = {
          first_name: this.name,
          second_name: this.lastName,
          number_document: this.idNumber,
          number_phone: this.contact,
          type_document: this.typeDocumen,
          gender: this.gender,
          birth_day: this.birthDate,
          _id: user._id
        };

        this.updateUser(updatedUserData);
    }
  }

  noShowMessagePopAd(message_err: string, typeOfAlert: string){
    this.typeOfAlert = typeOfAlert;
    this.popMessageComponent.typeOfAlert = typeOfAlert;
    this.messagePopAd = message_err;
    this.popMessageComponent.update();
    console.log(this.popMessageComponent.typeOfAlert);
    console.log(typeOfAlert);
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  updateUser(userUp: Object) {
    this.updateUserService.updateUser(userUp).subscribe(
      (response) => {
        // Manejar respuesta exitosa
        this.noShowMessagePopAd("Datos completados con exito", "check");
        console.log('Usuario actualizado con éxito:', response);

        const user = response;
        localStorage.setItem('user', JSON.stringify(user));

        this.router.navigate(['/profile'])
      },
      (error) => {
        // Manejar error
        this.noShowMessagePopAd("Error al registrarse ", error);
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }

}
