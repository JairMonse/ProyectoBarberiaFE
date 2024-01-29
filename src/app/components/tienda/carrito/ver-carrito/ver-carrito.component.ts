import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Carrito } from 'src/app/components/interface/Carrito';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-ver-carrito',
  templateUrl: './ver-carrito.component.html',
  styleUrls: ['./ver-carrito.component.css']
})
export class VerCarritoComponent implements OnInit, OnDestroy{

  id!: number;
  carrito!:Carrito;
  loading: boolean = false;
  carrito$!: Observable<Carrito>

  routeSub!: Subscription;

  constructor(private _carritoService: CarritoService,
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
   this.obtenerCarrito()
 }

 ngOnDestroy(): void {
   //this.routeSub.unsubscribe()
 }

 obtenerCarrito(){
  this.loading = true;
  this._carritoService.getCarrito(this.id).subscribe(data =>{
    this.carrito = data;
    this.loading=false;
  })
 }




}
