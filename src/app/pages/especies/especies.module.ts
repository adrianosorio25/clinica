// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Ruta
import { EspeciesRoutingModule } from '@pages/especies/especies-routing.module';

// Modulos Personalizados
import { MaterialModule } from '@app/material.module';

// Servicios
import { EspeciesService } from '@pages/especies/service/especies.service';

// Componente
import { EspeciesComponent } from '@pages/especies/components/especies.component';
import { ModalEspeciesComponent } from '@pages/especies/components/modal/modal-especies.component';

@NgModule({
  declarations: [
    EspeciesComponent,
    ModalEspeciesComponent],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    EspeciesRoutingModule
  ],
  providers: [EspeciesService]
})
export class EspeciesModule { }
