// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos Personalizados
import { PipesModule } from '@pipes/pipes.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@app/material.module';

// Ruta
import { PagesRoutingModule } from '@pages/pages-routing.module';

// Componentes
import { DashboardComponent } from '@pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
