import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private loginService: LoginService) {}

  getAuthToken(): Observable<boolean>{
    return this.loginService.validateToken();
  }
}
