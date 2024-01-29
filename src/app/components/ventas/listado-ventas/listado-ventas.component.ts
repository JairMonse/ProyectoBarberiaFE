import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VentasService } from 'src/app/services/ventas.service';
import { Inventario } from '../../interface/Inventario';
import { Ventas } from '../../interface/Ventas';

@Component({
  selector: 'app-listado-ventas',
  templateUrl: './listado-ventas.component.html',
  styleUrls: ['./listado-ventas.component.css']
})
export class ListadoVentasComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['nombreCliente','nombreProducto','cantidad','metodoPago','fechaRegistro','acciones'];
  dataSource = new MatTableDataSource<Ventas>();
  loading:boolean=false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _ventasService:VentasService){}

  ngOnInit(): void {
    this.obtenerVenta();
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

  obtenerVenta(){
    this.loading=true;
    this._ventasService.getVentas().subscribe(data =>{
      this.loading=false;
      this.dataSource.data = data;
    },error =>{
      this.loading = false;
      alert('ocurrio un error')
    })
  }

  eliminarVenta(id:number){
    this.loading=true;
    this._ventasService.deleteVenta(id).subscribe(() =>{
    this.mensajeExito();
    this.loading = false;
    this.obtenerVenta();
    });
  }

  mensajeExito(){
    this._snackBar.open('La venta ha sido eliminada con exito','',{
      duration:3000,
      horizontalPosition:'right'
    });
  }
}
