import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {

  constructor(private GifsService:GifsService) { }
  
  //permite obtener el array donde guardamos los elementos traidos de giphy y usarlo en el html
  get listado(){
    return this.GifsService.lista
  }

}
