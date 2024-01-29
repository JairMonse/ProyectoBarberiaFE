import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ventas } from '../components/interface/Ventas';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string ='api/Ventas/';

  constructor(private http: HttpClient) {
    
   }
   getVentas(): Observable<Ventas[]>{
    return this.http.get<Ventas[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   getVenta(id: number): Observable<Ventas>{
    return this.http.get<Ventas>(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }

   deleteVenta(id: number):Observable<void>{
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }


   addVenta(venta: Ventas): Observable<Ventas>{
    return this.http.post<Ventas>(`${this.myAppUrl}${this.myApiUrl}`,venta);

   }

   updateVenta(id:number, venta:Ventas):Observable<void>{
     return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,venta);
   }
}
