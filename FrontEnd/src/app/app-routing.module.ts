import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaPComponent } from './components/pagina-p/pagina-p.component'
import { PerfilComponent } from './components/perfil/perfil.component'

const routes: Routes = [
  {path: '', component: PaginaPComponent, pathMatch: 'full'},
  {path: 'perfil', component: PerfilComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
