import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/api/services/jobs/jobs.service';

@Component({
  selector: 'app-jobs-admin-list',
  templateUrl: './jobs-admin-list.component.html',
  styleUrls: ['./jobs-admin-list.component.scss']
})
export class JobsAdminListComponent implements OnInit{

  constructor(private jobsService: JobsService, private router: Router){}

  jobs:any;
  filterText: string=""
  stateEdit: boolean = false;
  jobByEdit:any;

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(){
    this.jobsService.getJobs().subscribe(
      resolve => {
        this.jobs = resolve;
      },
      error =>{
        console.error(error);
      }
    );
  }

  routerNavigate(id: string){
    this.router.navigate([/jobs/+id]);
  }

  addNewOffer(): void {
    // Lógica para agregar una nueva oferta laboral
  }

  editJob(job: any): void {
    if(job){
      this.jobByEdit = job;
    }else{
      this.jobByEdit = new Object;
    }

  }

  deleteJob(job: any): void {
    if(confirm("¿Seguro que desea eliminar la oferta "+job.title+"?")){
      this.jobsService.deteleJob(job._id  ).subscribe(
          resolve =>{
            this.removeJob(job);
            alert("Oferta eliminada exitosamente");
          },
          error => {
            alert("Error al tratar de eliminar la oferta");
            console.error(error);
          }
        );
      }
  }

  updateOrAddJob(job: any): void {
    const index = this.jobs.findIndex((j: any) => j._id === job._id);
    if (index !== -1) {
      // Actualizar el trabajo existente
      this.jobs[index] = job;
    } else {
      // Agregar un nuevo trabajo
      this.jobs.push(job);
    }
  }

  removeJob(job: any): void {
    const index = this.jobs.findIndex((j: any) => j._id === job._id);
    if (index !== -1) {
      // Eliminar el trabajo existente
      this.jobs.splice(index, 1);
    } else {
      console.warn("El trabajo no se encontró en la lista.");
    }
  }

}
