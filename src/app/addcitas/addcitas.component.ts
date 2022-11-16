import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Autores, Autor, Cita } from "../autores";
import { HttpService } from '../http.service';

@Component({
  selector: 'app-addcitas',
  templateUrl: './addcitas.component.html',
  styleUrls: ['./addcitas.component.css']
})
export class AddcitasComponent implements OnInit {
  Eid_AUT:string =""
  Enom_AUT:string=""
  muestraMens:Boolean=false
  
  cita:string=""
  Mesnaje2:string=""
  mensaje_back:string=""

  AUT2! : Autor
  CIT! : Cita
  CITA! : Cita[]

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
      console.log(data);
      if (data.existen === '2')
      {
        this.AUT2 = data.mensajes[0];
        this.CITA = data.mensajes[0].citas;
        this.Eid_AUT = this.AUT2._id; 
        this.Enom_AUT = this.AUT2.nombre;  
      } else if (data.existen === '0')
      { 
        this.muestraMens = true;
        this.Eid_AUT = ""; 
        this.Enom_AUT = "";          
      }
      else if (data.existen === '0')
        console.log(data.error)
    })
  }
  Crea(){
    this.mensaje_back = "";
    this.cita = this.cita.trim();
    if (this.cita === '')
    {
      this.Mesnaje2="Debe Ingresar la cita"
    } else {
      this.CIT = {_id:"",cita:this.cita, votos:0}
      let obs = this._HttpService.CreaCita(this.Eid_AUT, this.CIT);
      obs.subscribe((data) =>{
        if (data.existen==='0'){
          
          let mensaje: string = ""
          let respuesta: any= data
          for (let i=0 ; i<respuesta.error.length ; i++){
            mensaje += respuesta.error[i].msg
          }
          this.mensaje_back = mensaje

        }
        else
        {
          this.cita =""
          this._router.navigate(['/Citas/'+this.Eid_AUT]);
        }
      })
    }
  }
}