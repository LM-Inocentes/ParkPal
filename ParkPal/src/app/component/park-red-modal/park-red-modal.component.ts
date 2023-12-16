import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-park-red-modal',
  templateUrl: './park-red-modal.component.html',
  styleUrls: ['./park-red-modal.component.scss']
})
export class ParkRedModalComponent {
  userlevel!: number;
  constructor(
    public dialogRef: MatDialogRef<ParkRedModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isParker: boolean, level: number, title: string; message1: string, message2: string, message3: string }
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

