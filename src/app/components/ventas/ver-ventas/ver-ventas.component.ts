import { Component } from '@angular/core';
import { Ventas } from '../../interface/Ventas';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ver-ventas',
  templateUrl: './ver-ventas.component.html',
  styleUrls: ['./ver-ventas.component.css']
})
export class VerVentasComponent {

  id!: number;
  venta!:Ventas;
  loading: boolean = false;
  venta$!: Observable<Ventas>

  routeSub!: Subscription;

  constructor(private _ventasService: VentasService,
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
   this.obtenerVenta()
 }

 ngOnDestroy(): void {
   //this.routeSub.unsubscribe()
 }

 obtenerVenta(){
  this.loading = true;
  this._ventasService.getVenta(this.id).subscribe(data =>{
    this.venta = data;
    this.loading=false;
  })
 }


}
