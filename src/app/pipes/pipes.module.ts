// Modulos
import { NgModule } from '@angular/core';

// Pipes
import {ImagenPipe} from '@app/pipes/imagen.pipe';

@NgModule({
  declarations: [
    ImagenPipe
  ],
  exports: [
    ImagenPipe
  ],
  imports: []
})
export class PipesModule { }
