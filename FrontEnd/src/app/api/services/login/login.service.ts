import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'; // Importa el servicio CookieService de ngx-cookie-service
import { AddressService } from '../address/address.service';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.CONNECTION_BACK + '/api/v1/auth/login'; // Declara la URL de la API

  private _stadeLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private cookieService: CookieService,
  ) { } // Inyección de dependencias de HttpClient y CookieService


  get stadeLogin(){
    return this._stadeLogin.asObservable();
  }

  onLogin(email: string, passwordUser: string): Promise<boolean>{
    // Llama al método login del servicio LoginService y se suscribe al Observable devuelto
    return new Promise<boolean>((resolve, reject) => {
      this.login(email, passwordUser).subscribe(
        (response) => {
          // Convierte la respuesta JSON en un objeto JavaScript
          const responseObject = JSON.parse(response);
          // Extrae el correo electrónico del objeto de respuesta y lo guarda en una variable local
          const user = responseObject.data;
          this.saveUserStorage(user);
          const token = responseObject.tokenSession;
          this.saveTokenInCookie(token);
          resolve(true);
          this._stadeLogin.next(true);

        },
        (error) => {
          console.error('Error al iniciar sesión:');
          reject(false);
        }
      );
    });

  }

  saveUserStorage(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }


  login(email: string, password: string): Observable<any> { // Método de inicio de sesión, recibe un nombre de usuario y una contraseña y devuelve un Observable<any>

    const body = { // Crea un objeto con los datos del formulario
      email: email,
      password: password
    };

    const headers = new HttpHeaders({ // Crea las cabeceras de la solicitud HTTP
      'Content-Type': 'application/json' // Establece el tipo de contenido como JSON
    });

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' }).pipe( // Realiza una solicitud POST a la API con los datos del formulario
      catchError((error: any) => throwError(error)) // Maneja cualquier error que ocurra durante la solicitud
    );
  }

  saveTokenInCookie(token: any) {
    this.cookieService.set('token', token);
  }

  validateToken(): Promise<boolean> {
    const token = this.cookieService.get('token'); // Obtener el token del servicio de cookies

    const headers = new HttpHeaders({
      'Authorization': `${token}` // Incluir el token en los encabezados de la solicitud
    });

    return new Promise<boolean>((resolve, reject) => {
      this.http.get<any>(environment.CONNECTION_BACK + '/api/v1/auth/verifyToken', { headers,   responseType: 'text' as 'json' }).subscribe(
        (response) => {
          resolve(true);
          this._stadeLogin.next(true);
        },
        (error) => {
          console.error('Error al validar token:');
          reject(false);
        }
      );
    });

  }

  logout(): void {
    this.cookieService.deleteAll();
    localStorage.removeItem('user');
    this._stadeLogin.next(false);
  }

  getUser(id:string){

    const url = "https://freya-backend.onrender.com/api/v1/users/" +id;

    const token = this.cookieService.get('token'); // Obtener el token del servicio de cookies

    const headers = new HttpHeaders({
      'Authorization': `${token}` // Incluir el token en los encabezados de la solicitud
    });

    return this.http.post(url, { headers, responseType: 'text' })
  }

  getUserStorage(): any{
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData);
    }
    return {};
  }

  validateRol(){
    return 'admin' == this.getUserStorage().role;
  }


  changePass(old:string,newPass :string){
    const url = environment.CONNECTION_BACK + '/api/v1/auth/changePassword/' + this.getUserStorage()._id;

    const token = this.cookieService.get('token'); // Obtener el token del servicio de cookies

    const headers = new HttpHeaders({
      'Authorization': `${token}` // Incluir el token en los encabezados de la solicitud
    });

    const body ={
      oldPassword:old,
      newPassword:newPass
    }

    return this.http.put(url, body, { headers });
  }

  forgotPass(email:string){
    const url = environment.CONNECTION_BACK + '/api/v1/auth/passLogin';

    const body = {
      email : email
    }

    const headers = new HttpHeaders()
    return this.http.post(url, body,{headers});
  }
}


