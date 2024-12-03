import { Component, Input, OnInit } from '@angular/core';
import { JobsService } from 'src/app/api/services/jobs/jobs.service';

@Component({
  selector: 'app-apply-offer',
  templateUrl: './apply-offer.component.html',
  styleUrls: ['./apply-offer.component.scss']
})
export class ApplyOfferComponent implements OnInit{

  nombre: string = '';
  apellidos: string = '  ';
  email: string = '';
  contacto: string = '';
  hojaDeVida: File | null = null;

  @Input() id_job: string | null= "";
  job: any;

  constructor(private jobService: JobsService){}

  test(){
    console.log(this.job)
  }

  ngOnInit(): void {
      this.getJob();
  }

  getJob(){
    if(this.id_job){
      this.jobService.getJobById(this.id_job).subscribe(
        resolve =>{
          this.job = resolve;
        },
        error =>{
          console.error(error);
        }
      );
    }
  }


  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const allowedTypes = ['application/pdf'];
      if (allowedTypes.includes(selectedFile.type)) {
        this.hojaDeVida = selectedFile;
      } else {
        alert('Por favor selecciona un archivo PDF.');
      }
    }
  }

  applyToJob() {

    if (!this.validateFIelds()) {
      return;
    }

    // Construye el objeto CVUser con los datos del usuario y su CV
    const cvUser: any = {
      subject: this.job.title,
      name_employee: `${this.nombre} ${this.apellidos}`,
      email: this.email,
      number_phone: this.contacto,
      title: this.job.title,
      position: this.job.position,
      salary: this.job.salary,
      requeriments: this.job.requeriments,
      ubication: this.job.ubication
    };

    console.log(cvUser);

    this.jobService.applyJob(cvUser).subscribe(
      response => {
        alert('¡Solicitud enviada con éxito!');
      },
      error => {
       console.error('Error al enviar la solicitud:', error);
        alert('Ocurrió un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.');
      }
    );
  }

  validateFIelds(): boolean{

    if (!this.nombre) {
      alert('Por favor, ingresa tu nombre.');
      return false;
    }

    if (!this.apellidos) {
        alert('Por favor, ingresa tus apellidos.');
        return false;
    }


    if (!this.email) {
        alert('Por favor, ingresa tu correo electrónico.');
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return false;
    }

    if (!this.contacto) {
        alert('Por favor, ingresa tu número de contacto.');
        return false;
    }

    if (!this.hojaDeVida) {
        alert('Por favor, selecciona un archivo PDF.');
        return false;
    }


    if (!/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/.test(this.nombre)) {
      alert('El nombre solo debe contener letras y espacios.');
      return false;
    }

    if (!/^3[0-9]{9}$/.test(this.contacto)) {
      alert('El número de contacto debe ser un número colombiano válido sin el código de país (+57) y debe tener 10 dígitos.');
      return false;
    }

    return true;

  }

}
