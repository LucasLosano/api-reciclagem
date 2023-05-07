import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentoListComponent } from './departamento/departamento-list/departamento-list.component';

const routes: Routes = [
  { path: 'departamentos', component: DepartamentoListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }