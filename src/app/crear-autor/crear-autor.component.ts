import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Autores, Autor } from "../autores";
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-autor',
  templateUrl: './crear-autor.component.html',
  styleUrls: ['./crear-autor.component.css']
})
export class CrearAutorComponent implements OnInit {
  nombre:string=""
  Mesnaje2: string = "Ingrese Nombre";
  AUT2!: Autor;
  mensaje_back:string=""

  constructor(private _HttpService: HttpService , private _router: Router) { }

  ngOnInit(): void {
  }

  Crea(){
    this.mensaje_back = "";
    this.nombre = this.nombre.trim();
    if (this.nombre === '')
    {
      this.Mesnaje2="Debe Ingresar el nombre"
    } else {
      this.AUT2 = {_id:"",nombre:this.nombre, citas:[]}
      let obs = this._HttpService.Crea(this.AUT2);
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
          this.nombre =""
          this._router.navigate(['/']);
        }
      })
    }
  }

}
