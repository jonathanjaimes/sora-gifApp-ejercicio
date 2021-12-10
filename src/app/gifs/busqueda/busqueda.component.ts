import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

//Traemos el elemento input del html
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>

//Inyectamos el servicio
  constructor (private GifsService: GifsService) {

  }


  //La función toma el valor de la caja de texto mediante ViewChild, lo guarda en una variable, luego mediante la inyección del servicio GifsService manda ese valor a la función BuscarGifs la cual guarda el valor en el array de historial
  buscar () {
    const valor = this.txtBuscar.nativeElement.value

    //Permite evitar que se envíen vacios al array de historial
    if (valor.trim().length === 0){
      return;
    }

    this.GifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = ""
    
  }

}
