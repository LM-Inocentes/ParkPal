import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Admin } from 'src/app/shared/models/admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '/';
  user!: Admin;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    authService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      console.log(this.user);
    });
   }

   get form()
  {
    return this.loginForm.controls;
  }

  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.authService.AdminLogin({
      username: this.form['username'].value,
      password: this.form['password'].value
    }).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }

}
