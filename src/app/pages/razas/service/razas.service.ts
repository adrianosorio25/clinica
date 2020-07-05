import { Injectable } from '@angular/core';
import { Raza } from '@models/raza.model';
import { AuthService } from '@src/app/auth/service/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { URL_SERVICIOS } from '@config/config';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RazasService {

  razas: Raza[] = [];
  totalRazas: number = 0;

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private authService: AuthService) {}

  cargarRaza(desde: number = 0): Observable<any>{
    const url = URL_SERVICIOS + '/raza?desde=' + desde;

    return this.http.get(url)
      .pipe(map( (resp: any) => {
        this.totalRazas = resp.total;
        return resp.razas;
      }));
  }

  cargarRazaId(id: string): Observable<any>{
    const url = URL_SERVICIOS + '/raza/' + id;
    return this.http.get(url)
        .pipe(map((resp: any) => resp));
  }

  buscarRaza(termino: string): Observable<any>{
    const url = URL_SERVICIOS + '/busqueda/coleccion/razas/' + termino;

    return this.http.get(url)
        .pipe(map((resp: any) => resp.razas));
  }

  crearRaza( raza: Raza): Observable<any> {

    let url = URL_SERVICIOS + '/raza';
    url += '?token=' + this.authService.token;

    return this.http.post( url, raza )
      .pipe(map( (resp: any) => {
        this.snackbar.open('Raza Creada', resp.raza.nombre, {
          duration: 2900,
          panelClass: ['success-snackbar']
        });
        return resp.raza;
      })).pipe(catchError( err => {
        console.log(err);
        this.snackbar.open(err.error.mensaje, err.error.errors.message, {
          duration: 2900
        });
        return throwError(err);
      }));
  }

  actualizarRaza(raza: Raza, id: number): Observable<boolean> {

    let url = URL_SERVICIOS + '/raza/' + id;
    url += '?token=' + this.authService.token;

    return this.http.put(url, raza)
      .pipe(map( (resp: any) => {
        this.snackbar.open('Raza Actualizada', resp.raza.nombre, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });

        return true;
      }));
  }

  borrarRaza(id: number): Observable<boolean> {
    let url = URL_SERVICIOS + '/raza/' + id;
    url += '?token=' + this.authService.token;

    return this.http.delete(url)
      .pipe(map( (resp: any) => {
        this.snackbar.open('Raza Eliminada', resp.raza.nombre, {
          duration: 2900,
          panelClass: ['danger-snackbar']
        });
        return true;
      }));
  }
}
