import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public authService: AuthService, public router: Router) {}

  canActivate(): boolean {

    if ( this.authService.estaLogueado()) {
      console.log('Paso el login guard');
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
