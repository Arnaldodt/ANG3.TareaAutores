import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Autores, Autor, Cita } from "./autores";
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

  CreaCita(id:string,cit: Cita){
    let URL = `${environment.urlAPI}/CCita/${id}`
    return this._http.post<Autores>(URL,cit)
  }
  EliminaCita(id_AUT:string, id_CIT:string){
    let URL = `${environment.urlAPI}/ECita/${id_AUT}-${id_CIT}`
    return this._http.delete<Autores>(URL)
  }
  ActualizaCitaVoto(id_AUT:string, id_CIT:string,accion:string){
    let URL:string=""

    if (accion ==='+')
      {URL = `${environment.urlAPI}/ACitaVoto/${id_AUT}-${id_CIT}`}

    if (accion ==='-')
       URL = `${environment.urlAPI}/DCitaVoto/${id_AUT}-${id_CIT}`

    return this._http.put<Autores>(URL,{})
  }

}
