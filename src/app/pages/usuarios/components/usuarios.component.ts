import { Component, OnInit } from '@angular/core';
import { Usuario } from '@models/usuario.model';
import { UsuariosService } from '@pages/usuarios/service/usuarios.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  displayedColumns: string[] = ['imagen', 'email', 'nombre', 'role', 'auth', 'icono1', 'icono2'];

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
      });
  }

  cambiarDesde(valor: number): void {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string): void {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.usuarioService.buscarUsuarios(termino)
      .subscribe( (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      });
  }

  addUsuario(): void {}

  editUsuario(id: number): void {}

  borrarUsuario(usuario: Usuario): void {}

}
