// Modulos
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componente
import { UsuariosComponent } from '@pages/usuarios/components/usuarios.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
