import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-occupy-modal',
  templateUrl: './occupy-modal.component.html',
  styleUrls: ['./occupy-modal.component.scss']
})
export class OccupyModalComponent {
  constructor(
    public dialogRef: MatDialogRef<OccupyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  imageUrl: string = this.data.imageUrl;

  closeModal(): void {
    this.dialogRef.close();
  }
}
