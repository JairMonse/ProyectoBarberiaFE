import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrito } from '../components/interface/Carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string ='api/Carrito/';

  constructor(private http: HttpClient) {
    
   }
   getCarritos(): Observable<Carrito[]>{
    return this.http.get<Carrito[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   getCarrito(id: number): Observable<Carrito>{
    return this.http.get<Carrito>(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }

   deleteCarrito(id: number):Observable<void>{
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }


   addCarrito(carrito: Carrito): Observable<Carrito>{
    return this.http.post<Carrito>(`${this.myAppUrl}${this.myApiUrl}`,carrito);

   }

   updateCarrito(id:number, carrito:Carrito):Observable<void>{
     return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,carrito);
   }
}
