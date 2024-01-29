import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { ToastService } from 'src/app/services/toast.service';
import { ClienteInterface } from 'src/app/core/interfaces/cliente-interface';
import { Respuesta } from 'src/app/core/interfaces/respuesta';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  form: FormGroup;
  title: string = "Agregar";
  banderaSubmit: boolean = false;
  listClientes: ClienteInterface[] = [];
  idBandera: number = 0;
  displayedColumns: string[] = ['cedula', 'nombre', 'apellido', 'correo','usuario','contrasena', 'acciones'];
  dataSource = new MatTableDataSource<ClienteInterface>();
  banderaTable: boolean = false;

  constructor(
    private _clientesServicio: ClienteService,
    private _toast: ToastService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      correo: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

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
    this.getClientes();
  }

  getClientes() {
    this.banderaTable = true;
    this._clientesServicio.get().subscribe({
      next: (data) => this.dataSource.data = data,
      error: () => this._toast.error("Ha ocurrido un error"),
      complete: () => this.banderaTable = false
    });
  }

  submit() {
    if (this.form.invalid) {
      this._toast.error("Todos los campos son requeridos");
      return;
    }

    const cliente: ClienteInterface = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      cedula: this.form.value.cedula,
      correo: this.form.value.correo,
      usuario: this.form.value.usuario,
      contrasena: this.form.value.contrasena,
    };

    if (this.title === "Editar" && this.idBandera !== 0) {
      cliente.id = this.idBandera;
    }

    this.banderaSubmit = true;

    const apiCall = this.title === "Editar"
      ? this._clientesServicio.put(cliente)
      : this._clientesServicio.post(cliente);

    apiCall.subscribe({
      next: (respuesta: Respuesta) => this.handleApiResponse(respuesta),
      error: (respuesta) => this.handleApiError(respuesta),
      complete: () => this.handleApiComplete()
    });
  }

  edit(cliente: ClienteInterface) {
    if (cliente.id) {
      this.idBandera = cliente.id;
      this.title = "Editar";
      this.form.patchValue(cliente);
    }
  }

  delete(id: number) {
    this._clientesServicio.delete(id).subscribe({
      next: (respuesta: Respuesta) => this.handleApiResponse(respuesta),
      error: (respuesta) => this.handleApiError(respuesta),
      complete: () => this.getClientes()
    });
  }


  private handleApiResponse(respuesta: Respuesta) {
    const estado = respuesta && respuesta.estado;
  
    if (estado === false) {
      this._toast.error(respuesta.message);
      this.form.reset();
      return;
    }
  
    if (estado === true) {
      this._toast.success(respuesta.message);
      this.form.reset();
    }
  }
  

  private handleApiError(respuesta: any) {
    this._toast.error(respuesta.error.message);
    this.banderaSubmit = false;
  }

  private handleApiComplete() {
    this.banderaSubmit = false;
    this.title = "Agregar";
    this.getClientes();
  }
}
