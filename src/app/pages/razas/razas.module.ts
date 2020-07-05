// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Modulos Personalizados
import { MaterialModule } from '@app/material.module';

// Ruta
import { RazasRoutingModule } from '@pages/razas/razas-routing.module';

// Servicio
import { RazasService } from '@pages/razas/service/razas.service';

// Componentes
import { RazasComponent } from '@pages/razas/components/razas.component';
import { ModalRazasComponent } from '@pages/razas/components/modal/modal-razas.component';


@NgModule({
  declarations: [RazasComponent, ModalRazasComponent],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RazasRoutingModule
  ],
  providers: [RazasService]
})
export class RazasModule { }
