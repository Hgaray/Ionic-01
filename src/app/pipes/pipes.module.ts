import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrarListaPipe } from './filtrar-lista.pipe';



@NgModule({
  declarations: [
    FiltrarListaPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[FiltrarListaPipe]
})
export class PipesModule { }
