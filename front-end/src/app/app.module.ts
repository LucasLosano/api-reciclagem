import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { DepartamentoListComponent } from './departamento/departamento-list/departamento-list.component';
import { DepartamentoFormComponent } from './departamento/departamento-form/departamento-form.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { RecompensaListComponent } from './recompensa/recompensa-list/recompensa-list.component';
import { RecompensaFormComponent } from './recompensa/recompensa-form/recompensa-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartamentoListComponent,
    DepartamentoFormComponent,
    MenuComponent,
    RecompensaListComponent,
    RecompensaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
