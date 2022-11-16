import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Autores, Autor } from "../autores";
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  AUT!: Autor[];
  mesaje1: string = "*";
  
  constructor(private _HttpService: HttpService , private _router: Router) { }

  ngOnInit(): void {
    this.trae();
  }

  trae(){
    let obs = this._HttpService.Trae();
    obs.subscribe((data) =>{
      if (data.existen === '2')
      {
        this.AUT = data.mensajes;
        if (data.mensajes.length===0){
          this.mesaje1 ="Sin Autores"
        }
      } else if (data.existen === '0')
      { 
        this.mesaje1 ="Sin Autores"
      }
      else if (data.existen === '0')
        console.log(data.error)
    })
  }
  
  Quotes(id:string){
    this._router.navigate(['Citas/' + id]);
  }

  Busca(id:string){
    this._router.navigate(['Editar/' + id]);
  }
  
  Elimina(id:string){
    let obs = this._HttpService.Elimina(id);
    obs.subscribe((data) =>{
      if (data.existen==='0'){
        console.log(data.error)
      }
      else
      {
        this.trae();
      }
    })
  }
}
