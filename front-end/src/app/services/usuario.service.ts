import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UsuarioModel } from '../models/usuarioModel';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  private baseURL = `https://ecogestor.azurewebsites.net/api/v1/usuarios`;

  getUser(user: UsuarioModel): Observable<any> {
    return this.http.post(this.baseURL + '/autenticar', user);
  }

  createUser(user: UsuarioModel): Observable<any> {
    return this.http.post(this.baseURL + '/registrar', user);
  }
}
