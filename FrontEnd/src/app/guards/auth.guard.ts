import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanMatchFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../api/services/login/login.service';

export const AuthGuard: CanMatchFn = (route, state) => {
  const authService = inject(LoginService);
  return authService.validateToken();
};

