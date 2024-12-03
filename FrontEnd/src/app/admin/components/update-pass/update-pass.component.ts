import { Component, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/api/services/login/login.service';
import { PopMessageComponent } from '../pop-message/pop-message.component';

@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.scss']
})
export class UpdatePassComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmNewPassword: boolean = false;

  showSuccessMessage: boolean = false;
  messagePopAd: string = "error";
  typeOfAlert: string = "error";
  @ViewChild(PopMessageComponent) popMessageComponent!: PopMessageComponent;



  constructor(private loginService:LoginService){

  }

  toggleShowCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleShowNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleShowConfirmNewPassword() {
    this.showConfirmNewPassword = !this.showConfirmNewPassword;
  }

  changePassword() {
    if (this.newPassword != this.confirmNewPassword) {
      this.noShowMessagePopAd('La contraseña y la confirmación no coinciden.', 'error');
      return;
    }

    if(this.newPassword.length < 8){
      this.noShowMessagePopAd('La nueva contraseña debe contener al menos 8 dígitos', 'error');
      return;
    }

    this.loginService.changePass(this.currentPassword,this.newPassword).subscribe(
      resolve => {
        this.noShowMessagePopAd('Contraseña actualizada con éxito', 'check');
      },error =>{
        this.noShowMessagePopAd('Error al actualizar contraseña', 'error');
      }
    )

    // Reiniciar campos después de cambiar la contraseña.
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
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
