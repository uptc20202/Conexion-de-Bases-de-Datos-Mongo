import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private apiUrl = environment.CONNECTION_BACK + '/api/v1/jobs/';

  constructor(private http: HttpClient, private cookieService:CookieService) { }

  /**
   * Fetches a list of jobs from the backend service.
   *
   * @returns {Observable<any>} An Observable containing the list of jobs.
   */
  getJobs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  /**
   * Fetches a specific job by its ID from the backend service.
   *
   * @param {string} jobId - The ID of the job to be retrieved.
   * @returns {Observable<any>} An Observable containing the job data.
   */
  getJobById(jobId: string): Observable<any> {
    const url = `${this.apiUrl}${jobId}`;
    return this.http.get<any>(url);
  }

  /**
   * Adds a new job to the backend service.
   *
   * @param {any} jobData - The data of the job to be added.
   * @returns {Observable<any>} An Observable containing the response from the backend.
   */
  addJob(jobData: any): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl, jobData, { headers });
  }

  deteleJob(jobId:string){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiUrl}${jobId}`;
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  editJob(job:any){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}${job._id}`;
    return this.http.put<any>(url, job, { headers });
  }

  applyJob(cvUser:any){
    const formData = new FormData();
    formData.append('subject', cvUser.subject);
    formData.append('name_employee', cvUser.name_employee);
    formData.append('email', cvUser.email);
    formData.append('number_phone', cvUser.number_phone);
    formData.append('title', cvUser.title);
    formData.append('position', cvUser.position);
    formData.append('salary', cvUser.salary);
    formData.append('requeriments', cvUser.requeriments);
    formData.append('ubication', cvUser.ubication);

    const headers = new HttpHeaders();
    const url = `${this.apiUrl}${"uploadCV"}`;
    console.log(formData);
    return this.http.post(url, formData, { headers, responseType:'text' });
  }
}
