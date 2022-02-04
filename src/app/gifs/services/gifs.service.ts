import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIF, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "sfavElcR10lbepIGjBht0v9kjxhY8eFA"

  private _historial:string[] = []

  private servicioUrl:string = "http://api.giphy.com/v1/gifs"

  lista:Gif[] = []

//En el constructor inyectamos el servicio httpClient que necesitamos y en el método buscarGifs lo utilizamos
constructor(private _http: HttpClient) {
  //Permite en caso de que hayan elementos en el historial, mostrarlos en la pantalla. El JSON.parse hace el proceso contrario del stringify, toma un json y lo convierte en el objeto original que era.
    if(localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    }

    //Permite cargar las imágenes desde el localStorage
    if(localStorage.getItem('resultados')) {
      this.lista = JSON.parse(localStorage.getItem('resultados')!) || []
    }

  //Otra forma de hacerlo:
  //this._historial = JSON.parse(localStorage.getItem('historial)!) || []
}

//Aquí permite acceder a la array de términos de búsqueda
get historial() {
  return [... this._historial]
}

//La funcion permite agregar el elemento a array de historial

 //async buscarGifs (query:string = '') {
buscarGifs (query:string = '') {

  query = query.trim().toLocaleLowerCase();

  //Este condicional permite impedir la inclusión de elementos repetidos.
  if (!this._historial.includes(query)) {
    this._historial.unshift(query);
    //Permite hacer el corte unicamente cuando se inserta un nuevo elemento que no exista
    this._historial = this._historial.splice(0, 10) //Esto permite obtener solo los diez primeros elementos del array
  }

//Permite guardar el historial de búsquedas en el localstorage.
//el JSON.stringify() toma un objeto y lo convierte en string
  localStorage.setItem('historial', JSON.stringify( this._historial))
  
  const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
  
  
  //Aquí traemos la data y la mostramos
  //Se recomienda que se especifique el tipo de dato en la petición get pues esta es un genérico.
  this._http.get<SearchGIF>(`${this.servicioUrl}/search`, {params}) // {params: params} pero como se llaman igual, se coloca una sola vez
  .subscribe(data => {
    this.lista = data.data
    console.log(this.lista)

    //Permite guardar las imagenes en el localStorage
    localStorage.setItem('resultados', JSON.stringify(this.lista))

  })

  
  //Este params nos retorna: api_key=sfavElcR10lbepIGjBht0v9kjxhY8eFA&limit=10&q=casa que es justo la parte de la dirección que necesitamos

  console.log(params.toString())
  
  //traer datos usando el fetch
  // fetch('http://api.giphy.com/v1/gifs/search?api_key=sfavElcR10lbepIGjBht0v9kjxhY8eFA&q=casa&limit=10') //esto regresa una promesa
  //   .then(resp => {
  //     resp.json().then(data => console.log(data))
  //   })

  // Usando el async sería de la siguiente forma:

  // const resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=sfavElcR10lbepIGjBht0v9kjxhY8eFA&q=casa&limit=10');
  // const data = await resp.json();
  // console.log(data)


}


}
