import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { VerificationComponent } from '../verification/verification.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true;
  registerForm!:FormGroup;
  isSubmitted = false;
  OR!: File;
  CR!: File;
  SL!: File;
  ID!: File;
  Payment!: File;
  dialogRef!: MatDialogRef<VerificationComponent>;

  returnUrl = '/';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
    )

    { 
      this.registerForm = this.formBuilder.group({
        IDNo: ['', [Validators.required, Validators.minLength(11)]],
        Fullname: ['', [Validators.required, Validators.minLength(1)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(7)]],
        confirmPassword: ['', Validators.required],
        VMake: ['', Validators.required],
        VModel: ['', Validators.required],
        VPlateNo: ['', Validators.required],
      },{
        validators: PasswordsMatchValidator('password','confirmPassword')
      });
  
      this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];

    }

    get form() {
      return this.registerForm.controls;
    }  

    ORFile(event: any) {
      this.OR = event.target.files[0];
    }

    CRFile(event: any) {
      this.CR = event.target.files[0];
    }

    SLFile(event: any) {
      this.SL = event.target.files[0];
    }

    IDFile(event: any) {
      this.ID = event.target.files[0];
    }

    PaymentFile(event: any) {
      this.Payment = event.target.files[0];
    }

    submit(){
      this.isSubmitted = true;
      if (
        this.registerForm.invalid 
      ) {
        this.toastr.error('Please check your form fields.', 'Invalid Input');
        return;
      }
      if (
        !this.OR ||
        !this.CR ||
        !this.SL ||
        !this.ID ||
        !this.Payment
      ) {
        this.toastr.error('Please upload all required documents.', 'Submission Error');
        return;
      }

      const fv= this.registerForm.value;
      const user :IUserRegister = {
        id: fv.IDNo,
        Fullname: fv.Fullname,
        email: fv.email,
        password: fv.password,
        Level: '1',
        VMake: fv.VMake,
        VModel: fv.VModel,
        VPlateNo: fv.VPlateNo,
      };

      this.toastr.info('Check Your Email For The Verification Code', 'Code Sent');

      this.authService.sendVerificationEmail(fv.email).subscribe(
        response => {
          this.dialogRef = this.dialog.open(VerificationComponent, {
            width: '300px', 
            data: { VerificationCode: response }
          });
          this.dialogRef.afterClosed().subscribe(result => {
            if(!result){
              this.toastr.error(
                `Email Not Verified. Please Try Again`,
                'Incorrect Code'
              );
              return;
            }
            this.toastr.success(
              `Email Verified`,
              'Success'
            );
            this.RegisterUser(user);
          });
        },
        error => {
          console.error('Error sending verification email:', error);
        }
      );
    }

    RegisterUser(user: IUserRegister){
      this.authService.UserRegister(user).pipe(
        switchMap(() => this.authService.ORUpload(user.id, this.OR)),
        switchMap(() => this.authService.CRUpload(user.id, this.CR)),
        switchMap(() => this.authService.SLUpload(user.id, this.SL)),
        switchMap(() => this.authService.IDUpload(user.id, this.ID)),
        switchMap(() => this.authService.PaymentUpload(user.id, this.Payment))
      ).subscribe(
        () => {
          this.toastr.success(
            `Please Wait for Admin Confirmation`,
            'Application Submitted'
          );
          this.router.navigateByUrl('/');
        },
      );
    }
}