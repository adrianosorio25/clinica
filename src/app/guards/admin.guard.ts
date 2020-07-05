import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public authService: AuthService) {}

  canActivate(): boolean {

    if (this.authService.usuario.role === 'ADMIN_ROLE') {
      console.log('Guard Admin');
      return true;
    } else {
      console.log('Bloqueado Admin guard');
      this.authService.logout();
      return false;
    }

  }

}
