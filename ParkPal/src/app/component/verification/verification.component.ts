import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent {
  InputVerificationCode: string = '';
  EmailVerificationCode: string = '';

  constructor(public dialogRef: MatDialogRef<VerificationComponent>, @Inject(MAT_DIALOG_DATA) private data: { VerificationCode: string }) {
    this.EmailVerificationCode = this.data.VerificationCode;
  }
  
  submitVerification() {
    if(this.InputVerificationCode !== this.EmailVerificationCode){
      this.dialogRef.close(false);
      return;
    }
    this.dialogRef.close(true);
  }
}
