import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EspeciesComponent } from '@pages/especies/components/especies.component';

const routes: Routes = [
  { path: '', component: EspeciesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspeciesRoutingModule { }
