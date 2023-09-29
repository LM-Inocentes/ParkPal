import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Admin } from '../shared/models/admin';
import { ADMIN_LOGIN_URL, ADMIN_REGISTER_URL, USER_REGISTER_URL, USER_UPLOAD_CR, USER_UPLOAD_IDDOC, USER_UPLOAD_OR, USER_UPLOAD_PAYMENT, USER_UPLOAD_STUDYLOAD } from 'src/app/shared/apiURLS/URLS';
import { ILogin } from '../shared/interfaces/ILogin';
import { IAdminRegister } from '../shared/interfaces/IAdminRegister';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { User } from '../shared/models/user';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User>(this.UsergetUserFromLocalStorage());
  private adminSubject = new BehaviorSubject<Admin>(this.AdmingetUserFromLocalStorage());
  public userObservable: Observable<User>;
  public adminObservable: Observable<Admin>;

  constructor(private http:HttpClient, private toastrService: ToastrService, private router: Router) {
    this.userObservable = this.userSubject.asObservable();
    this.adminObservable = this.adminSubject.asObservable();
  }

  public get currentAdmin():Admin{
    return this.adminSubject.value;
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  AdminLogin(adminLogin: ILogin): Observable<Admin>{
    return this.http.post<Admin>(ADMIN_LOGIN_URL, adminLogin).pipe(
      tap({
        next: (admin) => {
          this.AdminsetUserToLocalStorage(admin);
          this.adminSubject.next(admin);
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
          this.AdminsetUserToLocalStorage(admin);
          this.adminSubject.next(admin);
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

  UserRegister(userRegister:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Application Failed');
        }
      })
    );
  }

  ORUpload(IDNo: any, image: File): Observable<User>{
    const uploadData = new FormData();
    uploadData.append('image', image);
    uploadData.append('id', IDNo);
    return this.http.patch<User>(USER_UPLOAD_OR, uploadData)
  }

  CRUpload(IDNo: any, image: File): Observable<User>{
    const uploadData = new FormData();
    uploadData.append('image', image);
    uploadData.append('id', IDNo);
    return this.http.patch<User>(USER_UPLOAD_CR, uploadData)
  }

  SLUpload(IDNo: any, image: File): Observable<User>{
    const uploadData = new FormData();
    uploadData.append('image', image);
    uploadData.append('id', IDNo);
    return this.http.patch<User>(USER_UPLOAD_STUDYLOAD, uploadData)
  }

  IDUpload(IDNo: any, image: File): Observable<User>{
    const uploadData = new FormData();
    uploadData.append('image', image);
    uploadData.append('id', IDNo);
    return this.http.patch<User>(USER_UPLOAD_IDDOC, uploadData)
  }

  PaymentUpload(IDNo: any, image: File): Observable<User>{
    const uploadData = new FormData();
    uploadData.append('image', image);
    uploadData.append('id', IDNo);
    return this.http.patch<User>(USER_UPLOAD_PAYMENT, uploadData)
  }

  AdminLogout(){
    this.adminSubject.next(new Admin());
    localStorage.removeItem(USER_KEY);
    this.router.navigateByUrl('/');
  }

  UserLogout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    this.router.navigateByUrl('/');
  }

  AdminsetUserToLocalStorage(user:Admin){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  UsersetUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  AdmingetUserFromLocalStorage():Admin{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as Admin;
    return new Admin();
  }

  UsergetUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }

  isAuthenticated(): boolean {
    return (localStorage.getItem(USER_KEY) != null);
  }
}
