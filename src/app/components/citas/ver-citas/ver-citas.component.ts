import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CitasService } from 'src/app/services/citas.service';
import { Citas } from '../../interface/Citas';

@Component({
  selector: 'app-ver-citas',
  templateUrl: './ver-citas.component.html',
  styleUrls: ['./ver-citas.component.css']
})
export class VerCitasComponent implements OnInit, OnDestroy{

  id!: number;
  cita!:Citas;
  loading: boolean = false;
  cita$!: Observable<Citas>

  routeSub!: Subscription;

  constructor(private _citasService: CitasService,
    private aRoute:ActivatedRoute){
       this.id= Number(this.aRoute.snapshot.paramMap.get('id'));
    }

 ngOnInit():void{
  //this.cita$ = this._citasService.getCita(this.id)
    /*this.aRoute.params.subscribe(data =>{
    console.log(data)
    this.id = data['id']
    this.obtenerCita()
    
  })*/
   this.obtenerCita()
 }

 ngOnDestroy(): void {
   //this.routeSub.unsubscribe()
 }

 obtenerCita(){
  this.loading = true;
  this._citasService.getCita(this.id).subscribe(data =>{
    this.cita = data;
    this.loading=false;
  })
 }

}
