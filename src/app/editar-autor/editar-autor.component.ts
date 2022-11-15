import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Autores, Autor } from "../autores";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-editar-autor',
  templateUrl: './editar-autor.component.html',
  styleUrls: ['./editar-autor.component.css']
})
export class EditarAutorComponent implements OnInit {
  Mesnaje3:string=""
  Eid:string=""
  Enombre:string=""
  AUT2!: Autor;
  muestraMens: boolean=false;
  mensaje_back:string=""

  constructor(private _HttpService: HttpService ,  private _route:  ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {

    this._route.params.subscribe((params:Params) => {
      this.Eid = params['id']
    })


    this.Busca();
  }

  Busca(){
    let obs = this._HttpService.Busca(this.Eid);
    obs.subscribe((data) =>{
      if (data.existen === '2')
      {
        this.AUT2 = data.mensajes[0];
        this.Eid = this.AUT2._id; 
        this.Enombre = this.AUT2.nombre;        
      } else if (data.existen === '0')
      { 
        this.muestraMens = true;
        this.Eid ="";
        this.Enombre = "";        
      }
      else if (data.existen === '0')
        console.log(data.error)
    })
  }
  
  Editar(){
    this.mensaje_back = "";
    this.Enombre = this.Enombre.trim();
    if (this.Eid === ''){

    } else if (this.Enombre === '')
    {
      this.Mesnaje3="Debe Ingresar el nombre"
    } else {
      this.AUT2 = {_id:"",nombre:this.Enombre}
      let obs = this._HttpService.Actualiza(this.Eid,this.AUT2);
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
          this.Eid =""
          this.Enombre =""
          this._router.navigate(['/']);
        }
      })
    }
  }
}
