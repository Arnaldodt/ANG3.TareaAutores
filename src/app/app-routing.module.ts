import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcitasComponent } from './addcitas/addcitas.component';
import { CitasComponent } from './citas/citas.component';
import { CrearAutorComponent } from './crear-autor/crear-autor.component';
import { EditarAutorComponent } from './editar-autor/editar-autor.component';
import { ListaComponent } from './lista/lista.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'Citas', children:[
    {path:':id', children:[
      {path:'',component: CitasComponent},
      {path:'AddCitas', component: AddcitasComponent}
    ]},
  ]},
  {path:'AddCitas/:id', component: AddcitasComponent},
  {path:'Crea', component: CrearAutorComponent},
  {path:'Editar/:id', component: EditarAutorComponent},
  {path:'', component: ListaComponent, pathMatch:'full'},
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
