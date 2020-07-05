import { Injectable } from '@angular/core';
import { Usuario } from '@models/usuario.model';
import { URL_SERVICIOS } from '@config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: Usuario;
  token: string;
  menu: [] = [];

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar) {
    this.cargarStorage();
  }

  login( usuario: Usuario, recordar: boolean = false): Observable<boolean> {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario)
        .pipe(map( (resp: any) => {
          this.snackbar.open('Bienvenido', resp.usuario.nombre, {
            duration: 2900,
            panelClass: ['info-snackbar']
          });
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          this.usuario = resp.usuario;
          return true;
        })).pipe(catchError(err => {
          this.snackbar.open('Error en el login', err.error.mensaje, {
            duration: 2900,
            panelClass: ['danger-snackbar']
          });
          return throwError(err);
        }));
  }

  logout(): void {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: [] ): void {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  cargarStorage(): void {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  estaLogueado(): boolean {
    return ( this.token.length > 5 ) ? true : false;
  }

  renuevaToken(): Observable<boolean> {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url)
        .pipe(map( (resp: any) => {
          this.token = resp.token;
          localStorage.setItem('token', this.token);
          return true;
        })).pipe(catchError(err => {
          this.router.navigate(['/login']);
          this.snackbar.open('No se pudo renovar token', '', {
            duration: 2900,
            panelClass: ['danger-snackbar']
          });
          return throwError(err);
        }));
  }
}
