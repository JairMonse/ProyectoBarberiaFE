import { inject } from "@angular/core"
import { Router } from "@angular/router"

import { ClienteService } from "../services/cliente.service"


export const AuthClienteGuard = () => {
  const router = inject(Router)
  const clie = inject(ClienteService)
  const token = localStorage.getItem('TOKEN')

  if (token) {
    return true;
  } else {
    clie.error('Acceso denegado')
    router.navigate(['/login']);
    return false;
  }  

}
