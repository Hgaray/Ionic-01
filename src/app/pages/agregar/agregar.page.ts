import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  @ViewChild(IonList) ionList2: IonList | undefined;
  lista: Lista | undefined;
  tarea = "";

  constructor(private deseosService: DeseosService
    , private route: ActivatedRoute
    , private alertCtrl: AlertController) {

    const listaId = this.route.snapshot.paramMap.get("listaId") || 0;
    this.lista = this.deseosService.ObtenerLista(listaId);

  }

  ngOnInit() {
  }

  AgregarTarea() {
    if (this.tarea.length === 0) {
      return;
    }

    this.lista?.items.push(new ListaItem(this.tarea));
    this.tarea = "";
    this.deseosService.GuardarStorage();
  }

  ItemChange(item: ListaItem) {

    const completados = this.lista?.items.filter(x => !x.completado).length;
    if (completados === 0) {
      this.lista!.terminada = true;
      this.lista!.terminadaEn = new Date();
    }
    else {
      this.lista!.terminada = false;
      this.lista!.terminadaEn = undefined;
    }
    this.deseosService.GuardarStorage();


  }

  Eliminar(index: number) {
    this.lista?.items.splice(index);
    this.deseosService.GuardarStorage();
    console.log(this.lista);
  }

  async Editar(descripcion: string, index: number) {

    const alert = await this.alertCtrl.create({
      header: 'Crear Lista',
      inputs: [
        {
          type: 'text',
          id: 'tarea',
          name: 'descripcion',
          value: descripcion
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
            console.log("Datos", data)
            if (data.descripcion.length == 0) {
              return;
            }

            this.lista!.items[index]!.descripcion = data.descripcion;
            this.deseosService.GuardarStorage();

            console.log("IOnlistTareas",this.ionList2)
            this.ionList2?.closeSlidingItems();

          }
        }
      ],
    });

    alert.present();

  }



}
