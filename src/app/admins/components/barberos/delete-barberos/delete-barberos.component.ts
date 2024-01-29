import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BarberoInterface } from 'src/app/core/interfaces/barbero-interface';
import { Respuesta } from 'src/app/core/interfaces/respuesta';
import { BarberoService } from 'src/app/core/services/barbero.service';

@Component({
  selector: 'app-delete-barberos',
  templateUrl: './delete-barberos.component.html',
  styleUrls: ['./delete-barberos.component.css']
})
export class DeleteBarberosComponent {

  bandera: boolean = false

  constructor(
    private _barberosServicio: BarberoService,
    private dialogRef: MatDialogRef<DeleteBarberosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BarberoInterface) { }

  eliminar() {
    if (this.data.id) {
      this._barberosServicio.delete(this.data.id).subscribe({
        next: (respuesta: Respuesta) => {
          const datosCierre = {
            estado: respuesta.estado,
            message: respuesta.message
          };
          this.dialogRef.close(datosCierre);
        },
        error: () => this.dialogRef.close(false),
        complete: () => this.bandera = false
      })
    }
  }

}
