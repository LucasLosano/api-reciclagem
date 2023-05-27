import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RecompensaModel } from '../models/recompensaModel';

@Injectable({
  providedIn: 'root'
})
export class RecompensaService {
  constructor(private http: HttpClient) { }

  private baseURL = `https://ecogestor.azurewebsites.net/api/v1/recompensas`;

  getAll(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  create(data: RecompensaModel): Observable<any> {
    return this.http.post(this.baseURL, data);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(this.baseURL + "/" + id);
  }

  put(data: RecompensaModel): Observable<any> {
    return this.http.put(this.baseURL, data);
  }
}
