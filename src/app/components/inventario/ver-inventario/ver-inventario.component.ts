import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { InventarioService } from 'src/app/services/inventario.service';
import { Inventario } from '../../interface/Inventario';

@Component({
  selector: 'app-ver-inventario',
  templateUrl: './ver-inventario.component.html',
  styleUrls: ['./ver-inventario.component.css']
})
export class VerInventarioComponent implements OnInit, OnDestroy{

  id!: number;
  inventario!:Inventario;
  loading: boolean = false;
  inventario$!: Observable<Inventario>

  routeSub!: Subscription;

  constructor(private _inventarioService: InventarioService,
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
   this.obtenerInventario()
 }

 ngOnDestroy(): void {
   //this.routeSub.unsubscribe()
 }

 obtenerInventario(){
  this.loading = true;
  this._inventarioService.getInventario(this.id).subscribe(data =>{
    this.inventario = data;
    this.loading=false;
  })
 }


  
}
