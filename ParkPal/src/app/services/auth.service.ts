import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Admin } from '../shared/models/admin';
import { ADMIN_LOGIN_URL, ADMIN_REGISTER_URL } from 'src/app/shared/apiURLS/URLS';
import { ILogin } from '../shared/interfaces/ILogin';
import { IAdminRegister } from '../shared/interfaces/IAdminRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<Admin>(this.getUserFromLocalStorage());
  public userObservable: Observable<Admin>;

  constructor(private http:HttpClient, private toastrService: ToastrService, private router: Router) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser():Admin{
    return this.userSubject.value;
  }

  AdminLogin(adminLogin: ILogin): Observable<Admin>{
    return this.http.post<Admin>(ADMIN_LOGIN_URL, adminLogin).pipe(
      tap({
        next: (admin) => {
          this.setUserToLocalStorage(admin);
          this.userSubject.next(admin);
          this.toastrService.success(
            `Welcome ${admin.Fullname}!`,
            'Login Successfully'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }

      })
    );
  }

  AdminRegister(adminRegister:IAdminRegister): Observable<Admin>{
    return this.http.post<Admin>(ADMIN_REGISTER_URL, adminRegister).pipe(
      tap({
        next: (admin) => {
          this.setUserToLocalStorage(admin);
          this.userSubject.next(admin);
          this.toastrService.success(
            `Welcome ${admin.Fullname}!`,
            'Registered Successfully'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        }

      })
    );
  }

  logout(){
    this.userSubject.next(new Admin());
    localStorage.removeItem(USER_KEY);
    this.router.navigateByUrl('/');
  }

  setUserToLocalStorage(user:Admin){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUserFromLocalStorage():Admin{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as Admin;
    return new Admin();
  }

  isAuthenticated(): boolean {
    return (localStorage.getItem(USER_KEY) != null);
  }
}
