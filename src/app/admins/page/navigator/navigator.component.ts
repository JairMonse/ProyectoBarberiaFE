import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  nombres!: string

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _toast: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      this._toast.error('Ocurrio un error');
      this.router.navigate(['/login-admins'])
      return
    }
    const decodedToken: any = jwtDecode(token);
    this.nombres = decodedToken.unique_name;    
  }

  cerrarSesion(){
    localStorage.removeItem('TOKEN');
    this.router.navigate([''])
  }

}
