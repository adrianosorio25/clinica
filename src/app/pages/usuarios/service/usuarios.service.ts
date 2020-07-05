import { Injectable } from '@angular/core';
import { Usuario } from '@models/usuario.model';
import { URL_SERVICIOS } from '@config/config';
import { AuthService } from '@auth/service/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router,
              private http: HttpClient, private snackbar: MatSnackBar) {}

  crearUsuario( usuario: Usuario): any {

    let url = URL_SERVICIOS + '/usuario';
    url += '?token=' + this.authService.token;

    return this.http.post( url, usuario )
      .pipe(map( (resp: any) => {
        this.snackbar.open('Usuario Creado', resp.usuario.nombre, {
          duration: 2900,
          panelClass: ['success-snackbar']
        });
        return resp.usuario;
      })).pipe(catchError( err => {
        console.log(err);
        this.snackbar.open(err.error.mensaje, err.error.errors.message, {
          duration: 2900,
          panelClass: ['danger-snackbar']
        });
        return throwError(err);
      }));
  }

  actualizarUsuario(usuario: Usuario): Observable<boolean> {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.authService.token;

    return this.http.put(url, usuario)
      .pipe(map( (resp: any) => {

        if ( usuario._id === this.usuario._id) {
          const usuarioDB: Usuario = resp.usuario;
          this.authService.guardarStorage( usuarioDB._id, this.authService.token, usuarioDB, this.authService.menu);
        }

        this.snackbar.open('Usuario Actualizado', resp.usuario.nombre, {
          duration: 2900,
          panelClass: ['info-snackbar']
        });

        return true;
      }));
  }

  // cambiarImagen(archivo: File, id: string): void {

  //   this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
  //     .then( (resp: any) => {
  //       this.usuario.img = resp.usuario.img;

  //       this.guardarStorage(id, this.token, this.usuario, this.menu);
  //     }).catch( resp => {
  //       console.log(resp);
  //     });

  // }

  cargarUsuarios(desde: number = 0): any {

    const url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);
  }

  buscarUsuarios(termino: string): Observable<any>{
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url)
        .pipe(map((resp: any) => resp.usuarios));
  }

  borrarUsuario(id: string): Observable<boolean>{
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.authService.token;

    return this.http.delete(url)
      .pipe(map( (resp: any) => {
        this.snackbar.open('Usuario Eliminado', resp.usuario.nombre, {
          duration: 2900,
          panelClass: ['danger-snackbar']
        });
        return true;
      }));
  }
}
