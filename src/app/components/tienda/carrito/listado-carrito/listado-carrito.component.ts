import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Carrito } from 'src/app/components/interface/Carrito';
import { CarritoService } from 'src/app/services/carrito.service';


@Component({
  selector: 'app-listado-carrito',
  templateUrl: './listado-carrito.component.html',
  styleUrls: ['./listado-carrito.component.css']
})
export class ListadoCarritoComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name','cantidad','precio','total','acciones'];
  dataSource = new MatTableDataSource<Carrito>();
  loading:boolean=false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _carritoService:CarritoService){}

  ngOnInit(): void {
    this.obtenerCarritos();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length >0){
      this.paginator._intl.itemsPerPageLabel="items por pagina";
    }
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerCarritos(){
    this.loading=true;
    this._carritoService.getCarritos().subscribe(data =>{
      this.loading=false;
      this.dataSource.data = data;
    },error =>{
      this.loading = false;
      alert('ocurrio un error')
    })
  }


  eliminarCarrito(id:number){
    this.loading=true;
    this._carritoService.deleteCarrito(id).subscribe(() =>{
    this.mensajeExito();
    this.loading = false;
    this.obtenerCarritos();
    });

  }


  mensajeExito(){
    this._snackBar.open('El carrito ha sido eliminado con exito','',{
      duration:3000,
      horizontalPosition:'right'
    });
  }
}
