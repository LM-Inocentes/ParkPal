import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-park-yellow-modal',
  templateUrl: './park-yellow-modal.component.html',
  styleUrls: ['./park-yellow-modal.component.scss']
})
export class ParkYellowModalComponent {
  userlevel!: number;
  constructor(
    public dialogRef: MatDialogRef<ParkYellowModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isParker: boolean, level: number, title: string; message: string }
  ) 
  {}

  unpark(): void {
    this.dialogRef.close('unpark');
  }

  report(): void {
    this.dialogRef.close('report');
  }

  reset(): void {
    this.dialogRef.close('reset');
  }
}
