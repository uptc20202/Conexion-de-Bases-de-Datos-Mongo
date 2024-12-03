import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { JobsService } from 'src/app/api/services/jobs/jobs.service';

@Component({
  selector: 'app-jobs-user-details.pages',
  templateUrl: './jobs-user-details.pages.component.html',
  styleUrls: ['./jobs-user-details.pages.component.scss']
})
export class JobsUserDetailsPagesComponent implements OnInit{

  viewJobId: string | null= "";

  constructor(private jobsService: JobsService, private routeActive: ActivatedRoute){

  }

  ngOnInit(): void {
      this.routeActive.paramMap.subscribe(
        params =>{
          this.viewJobId = params.get('id');
        }
      );
  }

}
