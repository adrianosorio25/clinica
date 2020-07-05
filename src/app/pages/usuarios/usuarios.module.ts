// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos Personalizados
import { MaterialModule } from '@app/material.module';
import { PipesModule } from '@pipes/pipes.module';

// Servicio
import { UsuariosService } from '@pages/usuarios/service/usuarios.service';

// Ruta
import { UsuariosRoutingModule } from '@pages/usuarios/usuarios-routing.module';

// Componentes
import { UsuariosComponent } from '@pages/usuarios/components/usuarios.component';


@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
    UsuariosRoutingModule
  ],
  providers: [UsuariosService]
})
export class UsuariosModule { }
