import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent {
  email: string = '';
  isValidEmail: boolean = true;
  emailTouched: boolean = false;

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
      this.email = '';
      this.emailTouched = false;
      this.isValidEmail = true;
    } else {
      alert('Por favor, ingrese un correo electrónico válido.');
    }
  }
}
