// Modulos
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AdminGuard } from '@guards/admin.guard';
import { VerificaTokenGuard } from '@guards/verifica-token.guard';

// Componentes
import { DashboardComponent } from '@pages/dashboard/dashboard.component';

const routes: Routes = [
  // Menú Home
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [VerificaTokenGuard],
    data: { titulo: 'Dashboard'}
  },
  // Menú Páginas
  {
    path: 'species',
    loadChildren: () => import('@pages/especies/especies.module').then(m => m.EspeciesModule),
    data: { titulo: 'Especies'}
  },
  {
    path: 'races',
    loadChildren: () => import('@pages/razas/razas.module').then(m => m.RazasModule),
    data: { titulo: 'Razas'}
  },
  {
    path: 'services',
    loadChildren: () => import('@pages/servicios/servicios.module').then(m => m.ServiciosModule),
    data: { titulo: 'Servicios'}
  },
  {
    path: 'users-setting',
    canActivate: [ AdminGuard ],
    loadChildren: () => import('@pages/usuarios/usuarios.module').then(m => m.UsuariosModule),
    data: { titulo: 'Mantenimiento De Usuarios'}
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
