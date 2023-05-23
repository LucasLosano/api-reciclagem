import { Component } from '@angular/core';
import { UsuarioModel } from '../models/usuarioModel';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { Observable, count, delay, timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: UsuarioModel = {} as UsuarioModel;
  errorMessage: string = "";
  message: string = "";

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
  }
  logar() {
    this.usuarioService.getUser(this.usuario)
      .subscribe(data => {
        this.errorMessage = data.error;
        if (data.sucesso) {
          sessionStorage.setItem('token', data.retorno.token)
          this.router.navigate(['']);
        }
      });
  }

  criarUsuario() {
    console.log(this.usuario.password);
    console.log(this.usuario.username);
    if (this.usuario.password == '' || this.usuario.password == undefined || this.usuario.username == '' || this.usuario.username == undefined) {
      this.errorMessage = 'Para se cadastrar, preencha o usuário e a senha, clique novamente em Cadastrar';
    } else {
      var action = async () => {
        await this.usuarioService.createUser(this.usuario)
          .subscribe(data => {
            this.errorMessage = data.erro;
            if (data.sucesso)
              this.logar();
          });
      }
      this.retryFunction(action);
    }
  }

  async retryFunction(action: () => Promise<void>) {
    let count = 0;
    let retry = true;
    do {
      await action();
      count++;
      retry = count < 3 && this.errorMessage !== "";
      await setTimeout(() => { }, 5000)
    } while (retry);
  }
}
