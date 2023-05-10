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

@NgModule({
  declarations: [
    AppComponent,
    DepartamentoListComponent,
    DepartamentoFormComponent,
    MenuComponent,
    RecompensaListComponent,
    RecompensaFormComponent,
    LoginComponent,
    PrincipalComponent
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
