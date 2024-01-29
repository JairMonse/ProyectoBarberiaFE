import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { BarberoInterface } from 'src/app/core/interfaces/barbero-interface';
import { Combo } from 'src/app/core/interfaces/combo';
import { Respuesta } from 'src/app/core/interfaces/respuesta';
import { BarberoService } from 'src/app/core/services/barbero.service';
import { CombosService } from 'src/app/core/services/combos.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-edit-barberos',
  templateUrl: './add-edit-barberos.component.html',
  styleUrls: ['./add-edit-barberos.component.css']
})
export class AddEditBarberosComponent implements OnInit {

  form: FormGroup
  fileName!: any;
  title: string = "Agregar barbero";
  iconName: string = "send";
  bandera: boolean = false
  listEspecialidades: Combo[] = []
  listJornadas: Combo[] = []

  constructor(
    private _barberosServicio: BarberoService,
    private _combosServicio: CombosService,
    private _toast: ToastService,
    private dialogRef: MatDialogRef<AddEditBarberosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BarberoInterface,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      especialidad: ['', Validators.required],
      experiencia: ['', Validators.required],
      telefono: ['', Validators.required],
      jornada: ['', Validators.required],
      imageName: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.llenarCombos()
    if (this.data) {
      this.title = "Editar Producto"
      this.iconName = "edit"
      this.fileName = this.data.imageName
      this.form.patchValue({
        nombres: this.data.nombres,
        especialidad: this.data.especialidadId,
        jornada: this.data.jornadaId,
        experiencia: this.data.experiencia,
        telefono: this.data.telefono
      })
    }
  }

  onFileSelected(event: Event) {
    this.fileName = (event.target as HTMLInputElement).files?.[0].name
  }

  llenarCombos() {
    forkJoin([
      this._combosServicio.getComboEspecialidades(),
      this._combosServicio.getComboJornadas()
    ]).subscribe({
      next: ([especialidades, jornadas]) => {
        this.listEspecialidades = especialidades;
        this.listJornadas = jornadas;
      },
      error: () => this._toast.error("Ha ocurrido un error")    
    });
  }

  submit() {
    if (this.form.invalid) {
      this._toast.error("Todos los campos son requeridos");
      return;
    }

    const barbero: BarberoInterface = {
      id: this.data ? this.data.id : 0,
      nombres: this.form.value.nombres,
      especialidadId: this.form.value.especialidad,
      jornadaId: this.form.value.jornada,
      experiencia: this.form.value.experiencia,
      telefono: this.form.value.telefono,
      imageName: this.fileName,
    };
    
    this.bandera = true;

    const apiCall = this.data ? this._barberosServicio.put(barbero) : this._barberosServicio.post(barbero);

    apiCall.subscribe({
      next: (respuesta: Respuesta) => {
        const datosCierre = {
          estado: respuesta.estado,
          message: respuesta.message
        };
        this.dialogRef.close(datosCierre);
      },
      error: () => this.dialogRef.close(false),
      complete: () => this.bandera = false
    });
  }

}
