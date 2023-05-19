import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  lista: Lista[] = [];
  terminadas:boolean=false;

  constructor(public deseosService: DeseosService
    , private router: Router
    , private alertCtrl: AlertController) {


    this.lista = deseosService.listas;

  }

  async AgregarLista() {
    

    const alert = await this.alertCtrl.create({
      header: 'Crear Lista',
      inputs: [
        {
          type: 'text',
          id: 'nombreLista',
          name: 'titulo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          handler: () => { console.log("Click on cancel") }
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log("Datos", data)
            if (data.titulo.length == 0) {
              return;
            }

            const listaId = this.deseosService.CrearLista(data.titulo);

            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          }
        }
      ],
    });

    alert.present();

    
  }

  VerDetalle(lista:Lista)
  {
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);

  }

}
