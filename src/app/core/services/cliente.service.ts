import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClienteInterface } from '../interfaces/cliente-interface';
import { Observable } from 'rxjs';
import { Respuesta } from '../interfaces/respuesta';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  error(arg0: string) {
    throw new Error("Method not implemented.");
  }

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Clientes/';

  constructor(
    private http: HttpClient,
  ) { }


  get(): Observable<ClienteInterface[]> {
    return this.http.get<ClienteInterface[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  post(newBarbero: ClienteInterface): Observable<Respuesta> {
    return this.http.post<Respuesta>(`${this.myAppUrl}${this.myApiUrl}`, newBarbero)
  }

  put(newBarbero: ClienteInterface): Observable<Respuesta> {
    return this.http.put<Respuesta>(`${this.myAppUrl}${this.myApiUrl}`, newBarbero);
  }

  delete(id: Number): Observable<Respuesta> {
    return this.http.delete<Respuesta>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

}
