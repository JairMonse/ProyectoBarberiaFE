import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BarberoInterface } from 'src/app/core/interfaces/barbero-interface';

@Component({
  selector: 'app-info-barberos',
  templateUrl: './info-barberos.component.html',
  styleUrls: ['./info-barberos.component.css']
})
export class InfoBarberosComponent {

  constructor(
    private dialogRef: MatDialogRef<InfoBarberosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BarberoInterface
  ) {
    
  }

}
