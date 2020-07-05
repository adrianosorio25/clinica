import { Component, OnInit } from '@angular/core';
import { Especie} from '@models/especie.model';
import { EspeciesService } from '@pages/especies/service/especies.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEspeciesComponent } from '@pages/especies/components/modal/modal-especies.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-especies',
  templateUrl: './especies.component.html',
  styles: []
})
export class EspeciesComponent implements OnInit {

  especies: Especie[] = [];
  totalRegistros: number = 0;
  desde: number = 0;

  displayedColumns: string[] = ['especie', 'icono1', 'icono2'];

  constructor(private especieService: EspeciesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarEspecies();
  }

  cargarEspecies(): void {
    this.especieService.cargarEspecie(this.desde)
      .subscribe( (resp: any) => {
        this.totalRegistros = this.especieService.totalEspecies;
        this.especies = resp.reverse();
      });
  }

  cambiarDesde(valor: number): void {
    const desde = this.desde + valor;

    if (desde <= -1 || desde >= this.totalRegistros) {
      return;
    }

    this.desde += valor;
    this.cargarEspecies();
  }

  buscarEspecie(termino: string): void {
    if (termino.length <= 0) {
      this.cargarEspecies();
      return;
    }

    this.especieService.buscarEspecie(termino)
      .subscribe( (especies: Especie[]) => {
        this.especies = especies;
      });
  }

  modalEspecie(id: number): void {
    const dialogRef = this.dialog.open(ModalEspeciesComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe( () => this.cargarEspecies());
  }

  borrarEspecie(especie: Especie): void {
    Swal.fire({
      title: '¿Esta Seguro?',
      text: 'Esta a punto de eliminar a: ' + especie.especie,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((borrar) => {
      if (borrar.value) {
        this.especieService.borrarEspecie(especie._id)
          .subscribe( resp => {
            this.cargarEspecies();
          });
      }
    });
  }

}
