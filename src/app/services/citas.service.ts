import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Citas } from '../components/interface/Citas';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string ='api/Cita/';

  constructor(private http: HttpClient) {
    
   }
   getCitas(): Observable<Citas[]>{
    return this.http.get<Citas[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   getCita(id: number): Observable<Citas>{
    return this.http.get<Citas>(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }

   deleteCita(id: number):Observable<void>{
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
   }


   addCita(cita: Citas): Observable<Citas>{
    return this.http.post<Citas>(`${this.myAppUrl}${this.myApiUrl}`,cita);

   }

   updateCita(id:number, cita:Citas):Observable<void>{
     return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,cita);
   }
}
