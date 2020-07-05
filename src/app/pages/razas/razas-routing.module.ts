// Modulos
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componente
import { RazasComponent } from '@pages/razas/components/razas.component';

const routes: Routes = [
  { path: '', component: RazasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RazasRoutingModule { }
