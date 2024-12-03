import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatchFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../api/services/login/login.service';

export const AdminGuard: CanMatchFn = (route, state) => {
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    return user.role == 'admin';
  }
  return false;
};

