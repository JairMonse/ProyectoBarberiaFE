import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/admins/services/auth.service';
import { environment } from 'src/environments/environment';
import { Combo } from '../interfaces/combo';

@Injectable({
  providedIn: 'root'
})
export class CombosService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Combos/';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getComboEspecialidades(): Observable<Combo[]>{
    return this.http.get<Combo[]>(`${this.myAppUrl}${this.myApiUrl}especialidades`);
  }

  getComboJornadas(): Observable<Combo[]>{
    return this.http.get<Combo[]>(`${this.myAppUrl}${this.myApiUrl}jornadas`);
  }

}
