import { Component } from '@angular/core';
import { UsuarioModel } from '../models/usuarioModel';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: UsuarioModel = {} as UsuarioModel;
  errorMessage: string = "";

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
  }
  logar(){
    this.usuarioService.getUser(this.usuario)
    .subscribe(data => {        
      this.errorMessage = data.error;      
      if(data.sucesso){
        sessionStorage.setItem('token', data.retorno.token)   
        this.router.navigate(['']);
      }
    });
  }

  criarUsuario(){
    this.usuarioService.createUser(this.usuario)
    .subscribe(data => {        
      this.errorMessage = data.error;      
      if(data.sucesso)
        this.logar(); 
    });
  }
}
