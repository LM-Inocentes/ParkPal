import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-park-green-modal',
  templateUrl: './park-green-modal.component.html',
  styleUrls: ['./park-green-modal.component.scss']
})
export class ParkGreenModalComponent {
  inputFlag: boolean = false;
  PlateNo!: string;
  constructor(
    public dialogRef: MatDialogRef<ParkGreenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { level: number, title: string; message: string }
  ) 
  {}

  park(): void {
    this.dialogRef.close('park');
  }

  report(): void {
    this.inputFlag = true;
  }

  doneReport(): void {
    this.dialogRef.close(this.PlateNo);
  }

}
