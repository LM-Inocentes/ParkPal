import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-mod-registration',
  templateUrl: './mod-registration.component.html',
  styleUrls: ['./mod-registration.component.scss']
})
export class ModRegistrationComponent {

  hide = true;
  registerForm!:FormGroup;
  isSubmitted = false;
  OR!: File;
  CR!: File;
  SL!: File;
  ID!: File;
  Payment!: File;

  returnUrl = '/';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
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
      console.log(this.OR);
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
      // const user :IUserRegister = {
      //   id: fv.IDNo,
      //   Fullname: fv.Fullname,
      //   email: fv.email,
      //   password: fv.password,
      //   Level: '1',
      //   VMake: fv.VMake,
      //   VModel: fv.VModel,
      //   VPlateNo: fv.VPlateNo,
      // };
      // console.log(user);
  

      // this.authService.ManualUserRegister(user).pipe(
      //   switchMap(() => this.authService.ORUpload(fv.IDNo, this.OR)),
      //   switchMap(() => this.authService.CRUpload(fv.IDNo, this.CR)),
      //   switchMap(() => this.authService.SLUpload(fv.IDNo, this.SL)),
      //   switchMap(() => this.authService.IDUpload(fv.IDNo, this.ID)),
      //   switchMap(() => this.authService.PaymentUpload(fv.IDNo, this.Payment))
      // ).subscribe(
      //   () => {
      //     this.toastr.success(
      //       'User has been registered successfully',
      //       'User Registered'
      //     );
      //     this.router.navigateByUrl('/');
      //   },
      // );
    }

}
