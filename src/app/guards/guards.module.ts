// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Guards
import { AdminGuard } from './admin.guard';
import { LoginGuard } from './login.guard';
import { VerificaTokenGuard } from './verifica-token.guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AdminGuard,
    LoginGuard,
    VerificaTokenGuard
  ]
})
export class GuardsModule { }
