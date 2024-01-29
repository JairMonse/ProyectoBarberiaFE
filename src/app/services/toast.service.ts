import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  notyf = new Notyf();

  constructor() { }

  error(mensaje: string) {
    this.notyf.error({
      message: mensaje,
      duration: 5000,
      dismissible: true
    })
  }

  warning(mensaje: string) {
    this.notyf.error({
      message: mensaje,
      duration: 5000,
      dismissible: true,
      background: '#efc314'
    })
  }

  success(mensaje: string) {
    this.notyf.success({
      message: mensaje,
      duration: 5000,
      dismissible: true,
      background: '#69AB3D'
    })
  }

}
