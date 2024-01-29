import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Citas } from '../interface/Citas';
import { Opciones } from '../interface/Opciones';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent  implements OnInit {


  loading: boolean=false;
  form:FormGroup
  id: number;

  listaCitas: Citas[] = [];

  listaBarberos: Opciones[] = [
    { id: 1, valor: 'Ana Martínez' },
    { id: 2, valor: 'Angelo Merchan' },
    { id: 3, valor: 'Axel Melten' },
    { id: 4, valor: 'María González' },
    { id: 5, valor: 'Carlos Ramírez' },
    { id: 6, valor: 'Peter Villamar' },
    { id: 7, valor: 'Juan García' },
    { id: 8, valor: 'Juan Mendez' },
  ];

  listaServicios: Opciones[] = [
    { id: 1, valor: 'Afeitar' },
    { id: 2, valor: 'Corte de pelo' },
    { id: 3, valor: 'Estilismo' },
    { id: 4, valor: 'Estilismo + Color' },
    { id: 5, valor: 'Ondulación semi-permanente' },
    { id: 6, valor: 'Recorte de barba' },
    { id: 7, valor: 'Corte + afeitado' },
    { id: 8, valor: 'Arreglo' },
    { id: 9, valor: 'Estilismo + Color' },
    { id: 10, valor: 'Corte + Estilismo + Color' },
  ];

  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
    private _citasService:CitasService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute){
    this.form=this.fb.group({
      fechaCita:['',Validators.required],
      hora:['',Validators.required],
      nombreBarbero:['',Validators.required],
      nombreCliente:['',Validators.required],
      telefono:['',Validators.required],
      correoE:['',Validators.required],
      tipoServicio:['',Validators.required],
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'))
    
    
  }

  ngOnInit():void{
    if(this.id != 0){
        this.operacion= 'Editar'
        this.obtenerCita(this.id)
    }

  }

  obtenerCita(id: number){
    this.loading=true;
    this._citasService.getCita(id).subscribe(data =>{
      this.form.patchValue({
        fechaCita: data.fechaCita,
        hora: data.hora,
        nombreBarbero: data.nombreBarbero,
        nombreCliente: data.nombreCliente,
        telefono:data.telefono,
        correoE: data.correoE,
        tipoServicio: data.tipoServicio,

      })
      this.loading = false;

    })
  }


  agregarEditarCita(){
    //const fechaCita = this.form.get('fechaCita')?.value

    const cita:Citas = {
      fechaCita: this.form.value.fechaCita,
      hora: this.form.value.hora,
      nombreBarbero: this.form.value.nombreBarbero,
      nombreCliente: this.form.value.nombreCliente,
      telefono: this.form.value.telefono,
      correoE: this.form.value.correoE,
      tipoServicio: this.form.value.tipoServicio,
    }
    if(this.id !=0 ){
      cita.id = this.id;
      this.editarCita(this.id,cita);

    }else{
      this.agregarCita(cita);
    }
  }

  editarCita(id:number, cita:Citas){
    this.loading=true;
    this._citasService.updateCita(id,cita).subscribe(() =>{
      this.loading = false;

      this.mensajeExito('actualizada');
      this.router.navigate(['/listCitas'])
    })
  }

  agregarCita(cita:Citas){
    this._citasService.addCita(cita).subscribe(data =>{
      this.mensajeExito('registrada');
      this.router.navigate(['/listCitas'])
    })
 
  }
  
  mensajeExito(texto: string){
    this._snackBar.open(`La cita ha sido ${texto} con exito`,'',{
      duration:3000,
      horizontalPosition:'right'
    });
  }




  }



