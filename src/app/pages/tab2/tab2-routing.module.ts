import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  }, 
  {
    path: 'agregar/:listaId',
    loadChildren: () => import('../agregar/agregar.module').then( m => m.AgregarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ComponentesModule],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
