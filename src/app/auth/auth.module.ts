// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Modulos Personalizados
import { MaterialModule } from '@app/material.module';

// Servicio
import { AuthService } from '@auth/service/auth.service';

// Ruta
import { AuthRoutingModule } from '@auth/auth-routing.module';

// Componente
import { AuthComponent } from '@auth/components/auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
