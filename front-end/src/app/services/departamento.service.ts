import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DepartamentoModel } from '../models/departamentoModel';

@Injectable({
  providedIn: 'root'
})

export class DepartamentoService {

  constructor(private http: HttpClient) { }

  private baseURL = `https://ecogestor.azurewebsites.net/api/v1/departamentos`;

  getAll(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  create(data: DepartamentoModel): Observable<any> {
    return this.http.post(this.baseURL, data);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(this.baseURL + "/" + id);
  }

  put(data: DepartamentoModel): Observable<any> {    
    return this.http.put(this.baseURL, data);
  }
}
