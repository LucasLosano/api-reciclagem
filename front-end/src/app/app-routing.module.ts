import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentoListComponent } from './departamento/departamento-list/departamento-list.component';
import { RecompensaListComponent } from './recompensa/recompensa-list/recompensa-list.component';
import { LoginComponent } from './login/login.component';
import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.guard';
import { PrincipalComponent } from './principal/principal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialListComponent } from './material/material-list/material-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UsuarioNaoAutenticadoGuard]},
  {
    path: '', component: PrincipalComponent, canActivate: [UsuarioAutenticadoGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'departamentos', component: DepartamentoListComponent },
      { path: 'recompensas', component: RecompensaListComponent },
      { path: 'materiais', component: MaterialListComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }