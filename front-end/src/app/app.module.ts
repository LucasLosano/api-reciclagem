import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DepartamentoListComponent } from './departamento/departamento-list/departamento-list.component';
import { DepartamentoFormComponent } from './departamento/departamento-form/departamento-form.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { RecompensaListComponent } from './recompensa/recompensa-list/recompensa-list.component';
import { RecompensaFormComponent } from './recompensa/recompensa-form/recompensa-form.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { AutenticationService as AuthenticationService } from './services/autentication/authentication.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialFormComponent } from './material/material-form/material-form.component';
import { MaterialListComponent } from './material/material-list/material-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartamentoListComponent,
    MaterialFormComponent,
    MaterialListComponent,
    DepartamentoFormComponent,
    MenuComponent,
    RecompensaListComponent,
    RecompensaFormComponent,
    LoginComponent,
    PrincipalComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ 
    {
     provide: HTTP_INTERCEPTORS,
     useClass: AuthenticationService,
     multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
