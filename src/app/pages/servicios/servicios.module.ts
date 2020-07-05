// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Modulos Personalizados
import { MaterialModule } from '@app/material.module';

// Ruta
import { ServiciosRoutingModule } from '@pages/servicios/servicios-routing.module';

// Servicio
import { ServiciosService } from '@pages/servicios/service/servicios.service';

// Componentes
import { ServiciosComponent } from '@pages/servicios/components/servicios.component';
import { ModalServiciosComponent } from '@pages/servicios/components/modal/modal-servicios.component';


@NgModule({
  declarations: [ServiciosComponent, ModalServiciosComponent],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    ServiciosRoutingModule
  ],
  providers: [ServiciosService]
})
export class ServiciosModule { }
