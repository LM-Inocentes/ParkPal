import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';



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
  selectedOR!: File;
  selectedCR!: File;
  selectedSL!: File;
  selectedID!: File;
  selectedPayment!: File;

  returnUrl = '/';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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

    CRFile(CR: any) {
      this.CR = CR.files[0];
    }

    SLFile(SL: any) {
      this.SL = SL.files[0];
    }

    IDFile(ID: any) {
      this.ID = ID.files[0];
    }

    PaymentFile(Payment: any) {
      this.Payment = Payment.files[0];
    }

    submit(){
      this.isSubmitted = true;
      if(this.registerForm.invalid||!this.OR||!this.CR||!this.SL||!this.ID||!this.Payment) return;
  
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
  
      this.authService.UserRegister(user).subscribe(_ => {})

    }
}


