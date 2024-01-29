import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Inventario} from '../interface/Inventario';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit{
  
    loading: boolean=false;
  form:FormGroup
  id: number;

  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
    private _inventarioService:InventarioService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute){
    this.form=this.fb.group({
      nombreProducto:['',Validators.required],
      cantidadProducto:['',Validators.required],
      precio:['',Validators.required],
      descripcion:['',Validators.required],
      categoria:['',Validators.required]
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'))
    
    
  }

  ngOnInit():void{
    if(this.id != 0){
        this.operacion= 'Editar'
        this.obtenerInventario(this.id)
    }

  }

  obtenerInventario(id: number){
    this.loading=true;
    this._inventarioService.getInventario(id).subscribe(data =>{
      this.form.patchValue({
        nombreProducto: data.nombreProducto,
        cantidadProducto: data.cantidadProducto,
        precio:data.precio,
        descripcion:data.descripcion,
        categoria:data.categoria,
      })
      this.loading = false;

    })
  }


  agregarEditarInventario(){
    const inventario:Inventario = {
      nombreProducto:this.form.value.nombreProducto,
      cantidadProducto:this.form.value.cantidadProducto,
      precio:this.form.value.precio,
      descripcion:this.form.value.descripcion,
      categoria:this.form.value.categoria,
    }
    if(this.id !=0 ){
      inventario.id = this.id;
      this.editarInventario(this.id,inventario);

    }else{
      this.agregarInventario(inventario);
    }
  }

  editarInventario(id:number, inventario:Inventario){
    this.loading=true;
    this._inventarioService.updateInventario(id,inventario).subscribe(() =>{
      this.loading = false;

      this.mensajeExito('actualizada');
      this.router.navigate(['/listInventario'])
    })
  }

  agregarInventario(inventario:Inventario){
    this._inventarioService.addInventario(inventario).subscribe(data =>{
      this.mensajeExito('registrada');
      this.router.navigate(['/listInventario'])
    })
 
  }
  
  mensajeExito(texto: string){
    this._snackBar.open(`El inventario ha sido ${texto} con exito`,'',{
      duration:3000,
      horizontalPosition:'right'
    });
  }


  }


