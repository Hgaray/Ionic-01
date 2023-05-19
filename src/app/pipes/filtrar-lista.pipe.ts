import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtrarLista',
  pure:false
})
export class FiltrarListaPipe implements PipeTransform {

  transform(lista: Lista[], terminados:boolean): Lista[] {

     return lista.filter(x=>x.terminada===terminados);
  }

}
