import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private apiUrl = environment.CONNECTION_BACK + '/api/v1/auth/register'; // Declara la URL de la API

  register(email: string, password: string){

    const user = email.split('@')[0];

    const body = {
      name_user: user,
      email: email,
      password: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' }).pipe( // Realiza una solicitud POST a la API con los datos del formulario
      catchError((error: any) => throwError(error)) // Maneja cualquier error que ocurra durante la solicitud
    );
  }
}
