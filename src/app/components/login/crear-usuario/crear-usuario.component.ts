import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../interface/Usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {

  form: FormGroup;
  listaUsuario: Usuario[] = [];

  displayedColumns: string[] = ['cedula','apellido','nombre','correoE','rol', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>();

  registrarUsuario(): void {
    const usuario: Usuario = {
      cedula: this.form.value.cedula,
      apellido: this.form.value.apellido,
      nombre: this.form.value.nombre,
      correoE: this.form.value.correoE,
      rol: this.form.value.rol
    };
  
    // Puedes llamar a un servicio para crear el usuario aquí
    // this.usuarioService.crearUsuario(nuevoUsuario);
  
    // O puedes emitir un evento para que el componente padre lo maneje
    this.listaUsuario.push(usuario);
    this.dataSource.data = this.listaUsuario;

    this.mensajeExito('registrado');

// Limpiar los controles después de registrar los datos
    this.form.reset();

  }



  mensajeExito(texto: string) {
    this._snackBar.open(`El usuario ha sido ${texto} con exito`, 'Sistema', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  mensajeError(texto: string) {
    this._snackBar.open(`Error: ${texto}`, 'Sistema', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  cancelar(): void {
    this.form.reset();
  }



  constructor(private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar, 
    private aRoute: ActivatedRoute){
      this.form = this.fb.group({
        cedula: ['',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(10),
            Validators.pattern(/^([0-9])*$/)
          ]
        ],
        apellido: ['', Validators.required],
        nombre: ['', Validators.required],
        correoE: ['', Validators.required]
  
      })

  }
}