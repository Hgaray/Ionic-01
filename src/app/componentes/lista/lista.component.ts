import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  @ViewChild(IonList) ionList: IonList | undefined;
  lista: Lista[] = [];
  @Input() terminadas: boolean = true;

  constructor(public deseosService: DeseosService
    , private router: Router
    , private alertCtrl: AlertController) {

    this.lista = this.deseosService.listas;
  }



  ngOnInit() {


  }

  VerDetalle(lista: Lista) {
    if (this.terminadas) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }
    else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  Eliminar(item: Lista) {

    this.lista = this.lista.filter(x => x != item);
    this.deseosService.GuardarStorage();

  }


  async Editar(item: Lista) {

    const alert = await this.alertCtrl.create({
      header: 'Crear Lista',
      inputs: [
        {
          type: 'text',
          id: 'tarea',
          name: 'titulo',
          value: item.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          handler: () => { console.log("Click on cancel") }
        },
        {
          text: 'Editar',
          handler: (data) => {
            console.log("Datos", data, item)
            if (data.titulo.length == 0) {
              return;
            }

            this.lista.find(x => x.id === item.id)!.titulo = data.titulo;
            this.deseosService.GuardarStorage();
            this.ionList?.closeSlidingItems();


          }
        }
      ],
    });

    alert.present();

  }
}
