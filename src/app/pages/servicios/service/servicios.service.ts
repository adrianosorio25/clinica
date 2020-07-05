import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Servicio } from '@models/servicios.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { URL_SERVICIOS } from '@config/config';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '@auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  servicio: Servicio[] = [];
  totalServicios: number = 0;

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private authService: AuthService) {}

  cargarServicio(desde: number = 0): Observable<any> {
    const url = URL_SERVICIOS + '/servicio?desde=' + desde;

    return this.http.get(url)
      .pipe(map( (resp: any) => {
        this.totalServicios = resp.total;
        return resp;
      }));
  }

  cargarServicioId(id: string): Observable<any> {
    const url = URL_SERVICIOS + '/servicio/' + id;
    return this.http.get(url)
        .pipe(map((resp: any) => resp));
  }

  buscarServicio(termino: string): Observable<any> {
    const url = URL_SERVICIOS + '/busqueda/coleccion/servicios/' + termino;

    return this.http.get(url)
        .pipe(map((resp: any) => resp.servicios));
  }

  crearServicio( servicio: Servicio): Observable<any>{

    let url = URL_SERVICIOS + '/servicio';
    url += '?token=' + this.authService.token;

    return this.http.post( url, servicio )
      .pipe(map( (resp: any) => {
        this.snackbar.open('Servicio Creado', resp.servicio.nombre, {
          duration: 2900,
          panelClass: ['success-snackbar']
        });
        return resp.servicio;
      })).pipe(catchError( err => {
        console.log(err);
        this.snackbar.open(err.error.mensaje, err.error.errors.message, {
          duration: 2900
        });
        return throwError(err);
      }));
  }

  actualizarServicio(servicio: Servicio, id: number): Observable<boolean> {

    let url = URL_SERVICIOS + '/servicio/' + id;
    url += '?token=' + this.authService.token;

    return this.http.put(url, servicio)
      .pipe(map( (resp: any) => {
        this.snackbar.open('Servicio Actualizado', resp.servicio.nombre, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });

        return true;
      }));
  }

  borrarServicio(id: number): Observable<boolean> {
    let url = URL_SERVICIOS + '/servicio/' + id;
    url += '?token=' + this.authService.token;

    return this.http.delete(url)
      .pipe(map( (resp: any) => {
        this.snackbar.open('Servicio Eliminado', resp.servicio.nombre, {
          duration: 2900,
          panelClass: ['danger-snackbar']
        });
        return true;
      }));
  }

}
