import { AuthService } from './../../admins/services/auth.service';
import { environment } from 'src/environments/environment';
import { BarberoInterface } from './../interfaces/barbero-interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../interfaces/respuesta';

@Injectable({
  providedIn: 'root'
})
export class BarberoService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Barberos/';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getPage(): Observable<BarberoInterface[]> {
    return this.http.get<BarberoInterface[]>(`${this.myAppUrl}${this.myApiUrl}page`);
  }

  getAdmin(): Observable<BarberoInterface[]> {
    return this.http.get<BarberoInterface[]>(`${this.myAppUrl}${this.myApiUrl}admin`, { headers: this.auth.getAuthHeaders() });
  }

  post(newBarbero: BarberoInterface): Observable<Respuesta> {
    return this.http.post<Respuesta>(`${this.myAppUrl}${this.myApiUrl}`, newBarbero, { headers: this.auth.getAuthHeaders() })
  }

  put(newBarbero: BarberoInterface): Observable<Respuesta> {
    return this.http.put<Respuesta>(`${this.myAppUrl}${this.myApiUrl}`, newBarbero, { headers: this.auth.getAuthHeaders() });
  }

  delete(id: Number): Observable<Respuesta> {
    return this.http.delete<Respuesta>(`${this.myAppUrl}${this.myApiUrl}${id}`, { headers: this.auth.getAuthHeaders() });
  }


}
