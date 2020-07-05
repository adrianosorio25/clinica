import { Injectable } from '@angular/core';
import { Especie } from '@models/especie.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@auth/service/auth.service';
import { URL_SERVICIOS } from '@config/config';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EspeciesService {

  especies: Especie[] = [];
  totalEspecies: number = 0;

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private authService: AuthService) {}

  cargarEspecie(desde: number = 0): Observable<any>{
    const url = URL_SERVICIOS + '/especie?desde=' + desde;

    return this.http.get(url)
      .pipe(map( (resp: any) => {
        this.totalEspecies = resp.total;
        return resp.especies;
      }));
  }

  cargarEspecieId(id: string): Observable<any>{
    const url = URL_SERVICIOS + '/especie/' + id;
    return this.http.get(url)
        .pipe(map((resp: any) => resp));
  }

  buscarEspecie(termino: string): Observable<any>{
    const url = URL_SERVICIOS + '/busqueda/coleccion/especies/' + termino;

    return this.http.get(url)
        .pipe(map((resp: any) => resp.especies));
  }

  crearEspecie( especie: Especie): Observable<any>{

    let url = URL_SERVICIOS + '/especie';
    url += '?token=' + this.authService.token;

    return this.http.post( url, especie )
      .pipe(map( (resp: any) => {
        this.snackbar.open('Especie Creada', resp.especie.especie, {
          duration: 2900,
          panelClass: ['success-snackbar']
        });
        return resp.especie;
      })).pipe(catchError( err => {
        console.log(err);
        this.snackbar.open(err.error.mensaje, err.error.errors.message, {
          duration: 2900
        });
        return throwError(err);
      }));
  }

  actualizarEspecie(especie: Especie, id: number): Observable<boolean>{

    let url = URL_SERVICIOS + '/especie/' + id;
    url += '?token=' + this.authService.token;

    return this.http.put(url, especie)
      .pipe(map( (resp: any) => {
        this.snackbar.open('Especie Actualizada', resp.especie.especie, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });

        return true;
      }));
  }

  borrarEspecie(id: number): Observable<boolean>{
    let url = URL_SERVICIOS + '/especie/' + id;
    url += '?token=' + this.authService.token;

    return this.http.delete(url)
      .pipe(map( (resp: any) => {
        this.snackbar.open('Especie Eliminada', resp.especie.especie, {
          duration: 2900,
          panelClass: ['danger-snackbar']
        });
        return true;
      }));
  }

}
