import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  listas: Lista[] = [];

  constructor() {

    this.CargarStorage();

  }

  CrearLista(titulo: string) {
    const newList = new Lista(titulo);
    this.listas.push(newList);
    this.GuardarStorage();
    return newList.id;
  }

  GuardarStorage() {
    localStorage.setItem("data", JSON.stringify(this.listas));
  }

  CargarStorage() {

    this.listas = JSON.parse(localStorage.getItem("data") || "[]");

  }

  ObtenerLista(listaId: string | number) {
    listaId = Number(listaId);

    return this.listas.find(data => data.id === listaId);
  }
}
