import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { EspeciesService } from '@pages/especies/service/especies.service';
import { Especie } from '@models/especie.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-modal-especies',
  templateUrl: './modal-especies.component.html',
  styles: [`
    button {
      margin: auto;
      display: block;
    }
  `
  ]
})
export class ModalEspeciesComponent implements OnInit {

  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  especieId: any;
  especie: any;
  titulo: string;
  tituloBoton: string;

  constructor(private especieService: EspeciesService, private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<ModalEspeciesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

                this.especieId = data;

                if (this.especieId ) {
                  // vamos a editar
                  this.titulo = 'Actualizar ';
                  this.tituloBoton = 'Actualizar';
                  this.getEspecieId(this.especieId);
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
      especie: new FormControl( '', Validators.required )
    });
  }

  getEspecieId( especieId: any): void {
    this.especieService.cargarEspecieId(especieId).subscribe(
      result => {
        if ( result.ok) {
          this.especie = result.especie;
          this.form.patchValue(this.especie);
        }
      }
    );
  }

  save(): void{
    const dataForm = JSON.parse(JSON.stringify(this.form.value));

    if (this.especieId ) {
      this.update(dataForm, this.especieId);
    } else {
      this.add(dataForm);
    }
  }

  update(data: Especie, id: number): void {
    this.especieService.actualizarEspecie(data, id)
      .subscribe();
  }

  add(data: Especie): void{
    this.especieService.crearEspecie(data)
      .subscribe();
  }

}
