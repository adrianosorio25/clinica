import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiciosService } from '@pages/servicios/service/servicios.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Servicio } from '@models/servicios.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-modal-servicios',
  templateUrl: './modal-servicios.component.html',
  styles: [`
    button {
      margin: auto;
      display: block;
    }
  `
  ]
})
export class ModalServiciosComponent implements OnInit {

  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  servicioId: any;
  servicio: any;
  titulo: string;
  tituloBoton: string;

  constructor(private serviciosService: ServiciosService, private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<ModalServiciosComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.servicioId = data;

                if (this.servicioId ) {
                  // vamos a editar
                  this.titulo = 'Actualizar ';
                  this.tituloBoton = 'Actualizar';
                  this.getServicioId(this.servicioId);
                } else {
                  // vamos a agregrar
                  this.titulo = 'Crear ';
                  this.tituloBoton = 'Guardar';
                }
              }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      nombre: new FormControl( '', Validators.required ),
      descripcion: new FormControl( '', Validators.required )
    });
  }

  getServicioId( servicioId: any): void {
    this.serviciosService.cargarServicioId(servicioId).subscribe(
      result => {
        if ( result.ok) {
          this.servicio = result.servicio;
          this.form.patchValue(this.servicio);
        }
      }
    );
  }

  save(): void{
    const dataForm = JSON.parse(JSON.stringify(this.form.value));

    if (this.servicioId ) {
      this.update(dataForm, this.servicioId);
    } else {
      this.add(dataForm);
    }
  }

  update(data: Servicio, id: number): void {
    this.serviciosService.actualizarServicio(data, id)
      .subscribe();
  }

  add(data: Servicio): void{
    this.serviciosService.crearServicio(data)
      .subscribe();
  }

}
