import { Component, OnInit } from '@angular/core';
import { Servicio } from '@models/servicios.model';
import { ServiciosService } from '@pages/servicios/service/servicios.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalServiciosComponent } from '@pages/servicios/components/modal/modal-servicios.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styles: [
  ]
})
export class ServiciosComponent implements OnInit {

  servicios: Servicio[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  displayedColumns: string[] = ['nombre', 'descripcion', 'icono1', 'icono2'];

  constructor(private serviciosService: ServiciosService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.serviciosService.cargarServicio(this.desde)
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.servicios = resp.servicios.reverse();
      });
  }

  cambiarDesde(valor: number): void {
    const desde = this.desde + valor;

    if (desde <= -1 || desde >= this.totalRegistros) {
      return;
    }

    this.desde += valor;
    this.cargarServicios();
  }

  buscarServicio(termino: string): void {
    if (termino.length <= 0) {
      this.cargarServicios();
      return;
    }

    this.serviciosService.buscarServicio(termino)
      .subscribe( (servicios: Servicio[]) => {
        this.servicios = servicios;
      });
  }

  modalServicio(id: number): void {
    const dialogRef = this.dialog.open(ModalServiciosComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe( () => this.cargarServicios());
  }

  borrarServicio(servicio: Servicio): void {
    Swal.fire({
      title: '¿Esta Seguro?',
      text: 'Esta a punto de eliminar a: ' + servicio.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((borrar) => {
      if (borrar.value) {
        this.serviciosService.borrarServicio(servicio._id)
          .subscribe( resp => {
            this.cargarServicios();
          });
      }
    });
  }

}
