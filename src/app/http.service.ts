import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Autores, Autor } from "./autores";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  Trae(){
    let URL = environment.urlAPI
    return this._http.get<Autores>(URL)
  }

  Crea(aut:Autor){
    let URL = `${environment.urlAPI}/CAutor`
    return this._http.post<Autores>(URL,aut)
  }

  Busca(id:string){
    let URL = `${environment.urlAPI}/BAutor/${id}`
    return this._http.get<Autores>(URL)
  }

  Actualiza(id:string, contenido: Autor){
    let URL = `${environment.urlAPI}/AAutor/${id}`
    return this._http.put<Autores>(URL,contenido)
  }

  Elimina(id:string){
    let URL = `${environment.urlAPI}/EAutor/${id}`
    return this._http.delete<Autores>(URL)
  }
}
