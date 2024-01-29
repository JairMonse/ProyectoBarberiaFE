import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BarberoInterface } from 'src/app/core/interfaces/barbero-interface';
import { Respuesta } from 'src/app/core/interfaces/respuesta';
import { BarberoService } from 'src/app/core/services/barbero.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-barberos-page',
  templateUrl: './barberos-page.component.html',
  styleUrls: ['./barberos-page.component.css']
})
export class BarberosPageComponent implements OnInit {

  barberos: BarberoInterface[] = []
  bandera: boolean = false

  constructor(
    private _barberosServices: BarberoService,
    private _alert: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bandera = true
    this._barberosServices.getPage().subscribe({
      next: (data) => this.barberos = data,
      error: () => {
        this._alert.error("Ha ocurrido un error"),
          this.router.navigate([''])
      },
      complete: () => this.bandera = false
    })
  }


}
