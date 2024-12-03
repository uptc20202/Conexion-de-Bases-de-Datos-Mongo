import { Component, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/api/services/login/login.service';
import { PopMessageComponent } from '../pop-message/pop-message.component';

@Component({
  selector: 'app-recoberypass',
  templateUrl: './recoberypass.component.html',
  styleUrls: ['./recoberypass.component.scss']
})
export class RecoberypassComponent {
  email: string = '';
  isValidEmail: boolean = true;
  emailTouched: boolean = false;

  showSuccessMessage: boolean = false;
  messagePopAd: string = "error";
  typeOfAlert: string = "error";
  @ViewChild(PopMessageComponent) popMessageComponent!: PopMessageComponent;


  constructor(private loginService:LoginService){}

  validateEmail() {
    this.emailTouched = true;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.isValidEmail = emailPattern.test(this.email);
  }

  recoverPassword() {
    if (this.isValidEmail) {
      // Aquí va la lógica para recuperar la contraseña, por ejemplo, llamando a un servicio.
      console.log('Correo enviado a:', this.email);

      // Resetear el campo de correo electrónico después de enviar el correo de recuperación
      this.noShowMessagePopAd('Si el correo es válido, se enviará un enlace para recuperar la contraseña.', 'check');
      this.email = '';
      this.emailTouched = false;
      this.isValidEmail = true;

      this.loginService.forgotPass(this.email);
    } else {
      this.noShowMessagePopAd('Por favor, ingrese un correo electrónico válido.', 'error');
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
