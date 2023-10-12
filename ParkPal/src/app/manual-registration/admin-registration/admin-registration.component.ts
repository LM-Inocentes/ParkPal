import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';
import { IAdminRegister } from 'src/app/shared/interfaces/IAdminRegister';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.scss']
})
export class AdminRegistrationComponent {
  
  registerForm!:FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    )
    { 
      this.registerForm = this.formBuilder.group({
        id: ['', [Validators.required, Validators.required]],
        Fullname: ['', [Validators.required, Validators.minLength(1)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(7)]],
        confirmPassword: ['', Validators.required],
      },{
        validators: PasswordsMatchValidator('password','confirmPassword')
      });
    }

    get form() {
      return this.registerForm.controls;
    }  

    submit(){
      this.isSubmitted = true;
      if (
        this.registerForm.invalid 
      ) {
        this.toastr.error('Please check your form fields.', 'Invalid Input');
        return;
      }
  
      const fv= this.registerForm.value;
       const admin :IAdminRegister = {
          id: fv.id,
          Fullname: fv.Fullname,
          email: fv.email,
          password: fv.password,
          username: fv.id,
      };
  
      this.authService.AdminRegister(admin).subscribe();
    }
}
