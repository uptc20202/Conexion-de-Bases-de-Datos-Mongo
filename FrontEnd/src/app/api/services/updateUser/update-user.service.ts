import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  private baseUrl: string = environment.CONNECTION_BACK + '/api/v1/users/';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  /**
   * Método para actualizar los datos de un usuario en la API
   * @param user Instancia de la clase User con los datos actualizados
   * @returns Observable que contiene la respuesta de la API
   */
  updateUser(user: any): Observable<any> {
    const url = `${this.baseUrl}${user._id}`; // Construir la URL usando el ID del usuario

    const token = this.cookieService.get('token');


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }); // Configurar los encabezados



    // Enviar la solicitud PUT a la API con los datos del usuario
    const { _id, email, ...userData } = user;


    return this.http.put(url, userData, { headers });
  }

}
