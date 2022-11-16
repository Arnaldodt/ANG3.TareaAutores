import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Autores, Autor, Cita } from "../autores";
import { HttpService } from '../http.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  Eid_AUT:string =""
  Enom_AUT:string=""
  muestraMens:Boolean=false
  Mensaje:string="*"
  AUT2! : Autor
  CITA! : Cita[]
  CIT! : Cita

  constructor(private _HttpService: HttpService, private _route: ActivatedRoute,private _router : Router) { }

  ngOnInit(): void {
    
    this._route.params.subscribe((params:Params) => {
      this.Eid_AUT = params['id']
    })


    this.Busca();
  }

  Busca(){
    let obs = this._HttpService.Busca(this.Eid_AUT);
    obs.subscribe((data) =>{
      if (data.existen === '2')
      {
        this.AUT2 = data.mensajes[0];
        this.CITA = data.mensajes[0].citas;
        this.Eid_AUT = this.AUT2._id; 
        this.Enom_AUT = this.AUT2.nombre;  
        
        if (this.CITA.length === 0){
          this.Mensaje ="Sin Citas"
        }

      } else if (data.existen === '0')
      { 
        this.muestraMens = true;
        this.Mensaje ="Sin Citas"
        this.Eid_AUT = ""; 
        this.Enom_AUT = "";          
      }
      else if (data.existen === '0')
        console.log(data.error)
    })
  }
  Quotes(id_Cita:string, accion :string){
      let obs = this._HttpService.ActualizaCitaVoto(this.AUT2._id, id_Cita, accion);
    obs.subscribe((data) =>{
      if (data.existen==='0'){
        console.log(data.error)
      }
      else
      {
        this.Busca();
      }
    })
  }

  Elimina(id_Cita:string){
    let obs = this._HttpService.EliminaCita(this.AUT2._id, id_Cita);
    obs.subscribe((data) =>{
      if (data.existen==='0'){
        console.log(data.error)
      }
      else
      {
        this.Busca();
      }
    })
  }
}
