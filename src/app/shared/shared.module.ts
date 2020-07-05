// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modulos Personalizados
import { PipesModule } from '@pipes/pipes.module';
import { MaterialModule } from '@app/material.module';

// Servicios
import { SidebarService } from '@shared/sidebar/service/sidebar.service';

// Componentes
import { UserComponent } from '@shared/header/user.component';
import { HeaderComponent } from '@shared/header/header.component';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '@shared/breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from '@shared/nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    NopagefoundComponent,
    SidebarComponent,
    UserComponent
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    NopagefoundComponent,
    SidebarComponent,
    UserComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    PipesModule,
    RouterModule
  ],
  providers: [SidebarService]
})
export class SharedModule { }
