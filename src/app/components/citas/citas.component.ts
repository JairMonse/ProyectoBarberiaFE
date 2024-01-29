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
    { id: 1, valor: 'David S' },
    { id: 2, valor: 'William Q' },
  ];

  listaServicios: Opciones[] = [
    { id: 1, valor: 'Afeitar' },
    { id: 2, valor: 'Corte de pelo' },
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


