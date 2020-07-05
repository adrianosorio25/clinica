// Modulos
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componente
import { ServiciosComponent } from '@pages/servicios/components/servicios.component';

const routes: Routes = [
  { path: '', component: ServiciosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
