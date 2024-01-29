import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Ventas } from '../interface/Ventas';
import { Opciones } from '../interface/Opciones';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit{

  listaVentas: Ventas[] = [];

  listaProductos: Opciones[] = [
    { id: 1, valor: 'Maquina de afeitar' },
    { id: 2, valor: 'Ceras para peinar' },
    { id: 3, valor: 'Navajas y maquinillas de afeitar' },
    { id: 4, valor: 'Secadores de cabello' },
    { id: 5, valor: 'Toallas y paños' },
    { id: 6, valor: 'Limpiadores faciales' },
    { id: 7, valor: 'Champús y acondicionadores' },
    { id: 8, valor: 'Cepillo para barba de cerdas naturales' },
    { id: 9, valor: 'Loción para después del afeitado' },
    { id: 10, valor: 'Tijeras y recortadoras de barba' },
    { id: 11, valor: 'Tazón de afeitar de acero inoxidable' },
    { id: 12, valor: 'Kit de afeitado clásico' },

    
  ];

  listaPago: Opciones[] = [
    { id: 1, valor: 'Paypal' },
    { id: 2, valor: 'Visa' },
    { id: 3, valor: 'Mastercard' },
    { id: 4, valor: 'Ahorros' },
  ];


loading: boolean=false;
form:FormGroup;
id: number;

operacion: string = 'Agregar';

constructor(private fb: FormBuilder,
  private _ventasService:VentasService,
  private _snackBar: MatSnackBar,
  private router: Router,
  private aRoute: ActivatedRoute){
  this.form=this.fb.group({
    nombreCliente:['',Validators.required],
    nombreProducto:['',Validators.required],
    cantidad:['',Validators.required],
    metodoPago:['',Validators.required],
    fechaRegistro:['',Validators.required]
  })

  this.id = Number(this.aRoute.snapshot.paramMap.get('id'))
  
  
}

ngOnInit():void{
  if(this.id != 0){
      this.operacion= 'Editar'
      this.obtenerVenta(this.id)
  }

}

obtenerVenta(id: number){
  this.loading=true;
  this._ventasService.getVenta(id).subscribe(data =>{
    this.form.patchValue({
      nombreCliente: data.nombreCliente,
      nombreProducto: data.nombreProducto,
      cantidad: data.cantidad,
      metodoPago: data.metodoPago,
      fechaRegistro: data.fechaRegistro

      
    })
    this.loading = false;

  })
}


agregarEditarVenta(){
  const venta:Ventas = {
    nombreCliente:this.form.value.nombreCliente,
    nombreProducto:this.form.value.nombreProducto,
    cantidad:this.form.value.cantidad,
    metodoPago:this.form.value.metodoPago,
    fechaRegistro:this.form.value.fechaRegistro,
  }
  if(this.id !=0 ){
    venta.id = this.id;
    this.editarVenta(this.id,venta);

  }else{
    this.agregarVenta(venta);
  }
}

editarVenta(id:number, venta:Ventas){
  this.loading=true;
  this._ventasService.updateVenta(id,venta).subscribe(() =>{
    this.loading = false;

    this.mensajeExito('actualizada');
    this.router.navigate(['/listVentas'])
  })
}

agregarVenta(venta:Ventas){
  this._ventasService.addVenta(venta).subscribe(data =>{
    this.mensajeExito('registrada');
    this.router.navigate(['/listVentas'])
  })

}

mensajeExito(texto: string){
  this._snackBar.open(`La venta ha sido ${texto} con exito`,'',{
    duration:3000,
    horizontalPosition:'right'
  });
}


}
