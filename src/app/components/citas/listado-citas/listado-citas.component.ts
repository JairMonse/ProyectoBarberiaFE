import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CitasService } from 'src/app/services/citas.service';
import { Citas } from '../../interface/Citas';

@Component({
  selector: 'app-listado-citas',
  templateUrl: './listado-citas.component.html',
  styleUrls: ['./listado-citas.component.css']
})
export class ListadoCitasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['fechaCita','hora','nombreBarbero','nombreCliente','telefono','correoE','tipoServicio','acciones'];
  dataSource = new MatTableDataSource<Citas>();
  loading:boolean=false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _citasService:CitasService){}

  ngOnInit(): void {
    this.obtenerCitas();
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

  // seguir viendo el video desde 2:48:23
  //forma 1
  obtenerCitas(){
    this.loading=true;
    this._citasService.getCitas().subscribe(data =>{
      this.loading=false;
      this.dataSource.data = data;
    },error =>{
      this.loading = false;
      alert('ocurrio un error')
    })
  }


  eliminarCita(id:number){
    this.loading=true;
    this._citasService.deleteCita(id).subscribe(() =>{
    this.mensajeExito();
    this.loading = false;
    this.obtenerCitas();
    });

  }


  mensajeExito(){
    this._snackBar.open('La cita ha sido eliminada con exito','',{
      duration:3000,
      horizontalPosition:'right'
    });
  }
}
