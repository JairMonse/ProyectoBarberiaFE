import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BarberoInterface } from 'src/app/core/interfaces/barbero-interface';
import { BarberoService } from 'src/app/core/services/barbero.service';
import { ToastService } from 'src/app/services/toast.service';
import { AddEditBarberosComponent } from '../add-edit-barberos/add-edit-barberos.component';
import { InfoBarberosComponent } from '../info-barberos/info-barberos.component';
import { DeleteBarberosComponent } from '../delete-barberos/delete-barberos.component';

@Component({
  selector: 'app-table-barberos',
  templateUrl: './table-barberos.component.html',
  styleUrls: ['./table-barberos.component.css']
})
export class TableBarberosComponent {

  displayedColumns: string[] = ['nombres', 'telefono', 'especialidad', 'experiencia', 'acciones'];
  dataSource = new MatTableDataSource<BarberoInterface>();
  bandera: boolean = false;

  constructor(
    private _barberosService: BarberoService,
    public dialog: MatDialog,
    private _alert: ToastService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = "Items por Página ";
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.getBarberos();    
  }

  getBarberos() {
    this.bandera = true;
    this._barberosService.getAdmin().subscribe({
      next: (data) => this.dataSource.data = data,
      error: () => this._alert.error("Ha ocurrido un error"),
      complete: () => this.bandera = false
    })
  }

  openAdd() {
    this.dialog.open(AddEditBarberosComponent, {
      autoFocus: false,
      disableClose: true,
      width: '20rem',
    }).afterClosed().subscribe((datosCierre) => this.handleDialogClosure(datosCierre));
  }

  openEdit(barbero: BarberoInterface) {
    this.dialog.open(AddEditBarberosComponent, {
      autoFocus: false,
      disableClose: true,
      width: '20rem',
      data: barbero
    }).afterClosed().subscribe((datosCierre) => this.handleDialogClosure(datosCierre));
  }

  openDelete(barbero: BarberoInterface) {
    this.dialog.open(DeleteBarberosComponent, {
      autoFocus: false,
      width: 'auto',
      data: barbero
    }).afterClosed().subscribe((datosCierre) => this.handleDialogClosure(datosCierre));
  }

  openInfo(barbero: BarberoInterface) {
    this.dialog.open(InfoBarberosComponent, {
      autoFocus: false,
      width: 'auto',
      data: barbero
    })
  }

  private handleDialogClosure(datosCierre: any) {
    if (datosCierre.estado === false || datosCierre === false) {
      this.getBarberos();
      this._alert.error("Ha ocurrido un error");
    } else if (datosCierre.estado === true) {
      this.getBarberos();
      this._alert.success(`${datosCierre.message}`);
    }
  }

}
