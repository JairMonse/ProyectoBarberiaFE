import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { ToastService } from "src/app/services/toast.service"


export const AuthGuard = () => {
  const router = inject(Router)
  const toast = inject(ToastService)
  const token = localStorage.getItem('TOKEN')

  if (token) {
    return true;
  } else {
    toast.error('Acceso denegado')
    router.navigate(['/login-admins']);
    return false;
  }  

}
