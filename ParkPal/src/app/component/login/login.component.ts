import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Admin } from 'src/app/shared/models/admin';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '/dashboard';
  user!: User;
  admin!: Admin;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if the user is already logged in when the component initializes
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl(this.returnUrl); // Redirect to dashboard
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  /*
    try {
      // Attempt to execute this.authService.userObservable.subscribe
      this.authService.adminObservable.subscribe((newAdmin) => {
        this.admin = newAdmin;
      });
    } catch (error) {
      this.authService.userObservable.subscribe((newUser) => {
        this.user = newUser;
      });
    }
    */
  }

  get form() {
    return this.loginForm.controls;
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    this.authService.AdminLogin({
      username: this.form['username'].value,
      password: this.form['password'].value,
    }).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
