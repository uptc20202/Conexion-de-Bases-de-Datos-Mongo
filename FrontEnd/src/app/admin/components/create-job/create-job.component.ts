import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobsService } from 'src/app/api/services/jobs/jobs.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit{

  @Input() job: any= {
    title: '',
    position: '',
    salary: null,
    requeriments: '',
    min_knowledge: '',
    responsibilities: '',
    ubication: ''
  };
  @Output() newJob: EventEmitter<any> = new EventEmitter<any>;
  @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>

  constructor(private jobService: JobsService){

  }

  ngOnInit(): void {

  }

  test(){
    console.log(this.job);
  }

  createJob(){
    if(!this.validateFields()){
      return;
    }

    if(!this.job._id){
      this.jobService.addJob(this.job).subscribe(
        resolve => {
          this.newJob.emit(resolve);
          this.back.emit(true);
        },
        error =>{
          alert("Error al crear Oferta");
          console.log(error);

        }
      );
    }else{
      this.editJob();
    }

  }

  editJob(){
    this.jobService.editJob(this.job).subscribe(
      resolve => {
        this.newJob.emit(resolve);
        alert("Oferta actualizada con exito");
        this.back.emit(true);
      },
      error =>{
        alert("Error al actualizar oferta");
        console.error(error);
      }
    );
  }

  goBack() {
    this.back.emit(true);
  }

  validateFields(): boolean {
    if (!this.job.title) {
      alert('El título es obligatorio.');
      return false;
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d?).*$/.test(this.job.title)) {
      alert('Formato de titulo incorrecto');
      return false;
    }
    if (!this.job.position) {
      alert('La posición es obligatoria.');
      return false;
    }
    if (this.job.salary == null || isNaN(this.job.salary)) {
      alert('El salario es obligatorio y debe ser un número.');
      return false;
    }
    if (!this.job.requeriments) {
      alert('Los requerimientos son obligatorios.');
      return false;
    }
    if (!this.job.min_knowledge) {
      alert('El conocimiento mínimo es obligatorio.');
      return false;
    }
    if (!this.job.responsibilities) {
      alert('Las responsabilidades son obligatorias.');
      return false;
    }
    if (!this.job.ubication) {
      alert('La ubicación es obligatoria.');
      return false;
    }
    return true;
  }
}
