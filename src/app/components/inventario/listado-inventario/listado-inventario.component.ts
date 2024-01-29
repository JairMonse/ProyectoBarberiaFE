import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from 'src/app/services/inventario.service';
import { Inventario } from '../../interface/Inventario';

@Component({
  selector: 'app-listado-inventario',
  templateUrl: './listado-inventario.component.html',
  styleUrls: ['./listado-inventario.component.css']
})
export class ListadoInventarioComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['nombreProducto','cantidadProducto','precio','descripcion','categoria','acciones'];
  dataSource = new MatTableDataSource<Inventario>();
  loading:boolean=false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _inventarioService:InventarioService){}

  ngOnInit(): void {
    this.obtenerInventario();
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

  obtenerInventario(){
    this.loading=true;
    this._inventarioService.getInventarios().subscribe(data =>{
      this.loading=false;
      this.dataSource.data = data;
    },error =>{
      this.loading = false;
      alert('ocurrio un error')
    })
  }

  eliminarInventario(id:number){
    this.loading=true;
    this._inventarioService.deleteInventario(id).subscribe(() =>{
    this.mensajeExito();
    this.loading = false;
    this.obtenerInventario();
    });

  }

  mensajeExito(){
    this._snackBar.open('El producto ha sido eliminado con exito','',{
      duration:3000,
      horizontalPosition:'right'
    });
  }

}
