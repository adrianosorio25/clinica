import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RazasService } from '@pages/razas/service/razas.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Especie } from '@models/especie.model';
import { Raza } from '@models/raza.model';
import { EspeciesService } from '@pages/especies/service/especies.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-modal-razas',
  templateUrl: './modal-razas.component.html',
  styles: [`
    button {
      margin: auto;
      display: block;
    }
  `
  ]
})
export class ModalRazasComponent implements OnInit {

  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  razaId: any;
  raza: any;
  especies: Especie[] = [];
  titulo: string;
  tituloBoton: string;

  constructor(private razasService: RazasService, private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<ModalRazasComponent>, private especieService: EspeciesService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.razaId = data;

                if (this.razaId ) {
                  // vamos a editar
                  this.titulo = 'Actualizar ';
                  this.tituloBoton = 'Actualizar';
                  this.getRazaId(this.razaId);
                } else {
                  // vamos a agregrar
                  this.titulo = 'Crear ';
                  this.tituloBoton = 'Guardar';
                }
              }

  ngOnInit(): void {
    this.especieService.cargarEspecie()
      .subscribe( especies => {
        this.especies = especies;
      });

    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      nombre: new FormControl( '', Validators.required ),
      especie: new FormControl( '', Validators.required )
    });
  }

  getRazaId( razaId: any): void {
    this.razasService.cargarRazaId(razaId).subscribe(
      result => {
        if ( result.ok) {
        this.raza = result.raza;
        this.form.patchValue(this.raza);
        }
      }
    );
  }

  save(): void {
    const dataForm = JSON.parse(JSON.stringify(this.form.value));

    if (this.razaId ) {
      this.update(dataForm, this.razaId);
    } else {
      this.add(dataForm);
    }
  }

  update(data: Raza, id: number): void {
    this.razasService.actualizarRaza(data, id)
      .subscribe();
  }

  add(data: Raza): void {
    this.razasService.crearRaza(data)
      .subscribe();
  }

}
