import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { UsuarioInterface } from '../../interfaces/usuario-interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  form: FormGroup;
  bandera: boolean = false

  constructor(
    private _alert: ToastService,
    private _auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  

  ngOnInit() {
    localStorage.removeItem('TOKEN')
  }

  handleSubmit() {
    if (this.form.invalid) {
      this._alert.error("Todos los campos son requeridos.");
      return;
    }

    const credenciales: UsuarioInterface = {
      username: this.form.value.username,
      password: this.form.value.password
    };

    this.bandera = true;

    this._auth.auth(credenciales).subscribe({
      next: (respuesta: any) => {
        if (respuesta.estado === false) {          
          this.handleInvalidCredentials(respuesta.message);
          return;
        }
        this.handleValidCredentials(respuesta);
      },
      error: () => this.handleError(),
      complete: () => this.bandera = false
    });
  }

  private handleInvalidCredentials(respuesta: string) {
    this._alert.warning(respuesta);
    this.form.reset();
  }

  private handleValidCredentials(respuesta: string) {
    localStorage.setItem('TOKEN', respuesta);
    this._alert.success('Bienvenido');
    this.router.navigate(['/dashboard']);
  }

  private handleError() {
    this._alert.error('Ha ocurrido un error');
    this.form.reset();
    this.bandera = false;
  }

}
