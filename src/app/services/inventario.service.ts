import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inventario } from '../components/interface/Inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string ='api/Inventario/';

  constructor(private http: HttpClient) {
    
   }
   getInventarios(): Observable<Inventario[]>{
    return this.http.get<Inventario[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   getInventario(id: number): Observable<Inventario>{
    return this.http.get<Inventario>(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }

   deleteInventario(id: number):Observable<void>{
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }


   addInventario(inventario: Inventario): Observable<Inventario>{
    return this.http.post<Inventario>(`${this.myAppUrl}${this.myApiUrl}`,inventario);

   }

   updateInventario(id:number, inventario:Inventario):Observable<void>{
     return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,inventario);
   }
}
