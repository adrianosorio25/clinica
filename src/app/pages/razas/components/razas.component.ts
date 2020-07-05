import { Component, OnInit } from '@angular/core';
import { Raza } from '@models/raza.model';
import { RazasService } from '@pages/razas/service/razas.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ModalRazasComponent } from '@pages/razas/components/modal/modal-razas.component';

@Component({
  selector: 'app-razas',
  templateUrl: './razas.component.html',
  styles: []
})
export class RazasComponent implements OnInit {

  razas: Raza[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  displayedColumns: string[] = ['nombre', 'especie', 'icono1', 'icono2'];

  constructor(private razasService: RazasService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarRazas();
  }

  cargarRazas(): void {
    this.razasService.cargarRaza(this.desde)
      .subscribe( (resp: any) => {
        this.totalRegistros = this.razasService.totalRazas;
        this.razas = resp.reverse();
      });
  }

  cambiarDesde(valor: number): void {
    const desde = this.desde + valor;

    if (desde <= -1 || desde >= this.totalRegistros) {
      return;
    }

    this.desde += valor;
    this.cargarRazas();
  }

  buscarRaza(termino: string): void {
    if (termino.length <= 0) {
      this.cargarRazas();
      return;
    }

    this.razasService.buscarRaza(termino)
      .subscribe( (razas: Raza[]) => {
        this.razas = razas;
      });
  }

  modalRaza(id: number): void {
    const dialogRef = this.dialog.open(ModalRazasComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe( () => this.cargarRazas());
  }

  borrarRaza(raza: Raza): void {
    Swal.fire({
      title: '¿Esta Seguro?',
      text: 'Esta a punto de eliminar a: ' + raza.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((borrar) => {
      if (borrar.value) {
        this.razasService.borrarRaza(raza._id)
          .subscribe( resp => {
            this.cargarRazas();
          });
      }
    });
  }

}
