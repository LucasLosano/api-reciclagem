import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MaterialModel } from '../models/materialModel';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  constructor(private http: HttpClient) { }

  private baseURL = `https://ecogestor.azurewebsites.net/api/v1/materiais`;

  getAll(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  create(data: MaterialModel): Observable<any> {
    return this.http.post(this.baseURL, data);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(this.baseURL + "/" + id);
  }

  put(data: MaterialModel): Observable<any> {
    return this.http.put(this.baseURL, data);
  }
  
}
