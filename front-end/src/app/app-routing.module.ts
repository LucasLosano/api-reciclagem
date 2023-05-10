import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentoListComponent } from './departamento/departamento-list/departamento-list.component';
import { RecompensaListComponent } from './recompensa/recompensa-list/recompensa-list.component';

const routes: Routes = [
  { path: 'departamentos', component: DepartamentoListComponent },
  { path: 'recompensas', component: RecompensaListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }