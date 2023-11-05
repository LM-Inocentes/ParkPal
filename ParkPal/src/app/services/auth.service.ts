import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LOGIN_URL, ADMIN_REGISTER_URL, GET_PENDING_USER_URL, USER_REGISTER_URL, USER_UPLOAD_CR, USER_UPLOAD_IDDOC, USER_UPLOAD_OR, USER_UPLOAD_PAYMENT, USER_UPLOAD_STUDYLOAD, APPROVE_PENDING_USER_URL, REJECT_PENDING_USER_URL, USER_MANUAL_REGISTER_URL, MOD_REGISTER_URL, GET_REGISTERED_USER_URL, DELETE_REGISTERED_USER_URL } from 'src/app/shared/apiURLS/URLS';
import { ILogin } from '../shared/interfaces/ILogin';
import { IAdminRegister } from '../shared/interfaces/IAdminRegister';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { User } from '../shared/models/user';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http:HttpClient, private toastrService: ToastrService, private router: Router) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  Login(adminLogin: ILogin): Observable<User>{
    return this.http.post<User>(LOGIN_URL, adminLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome ${user.Fullname}!`,
            'Login Successfully'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }

      })
    );
  }

  AdminRegister(adminRegister:IAdminRegister): Observable<User>{
    return this.http.post<User>(ADMIN_REGISTER_URL, adminRegister).pipe(
      tap({
        next: (user) => {
          this.toastrService.success(
            `Admin Registered`,
            'Success'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Registration Failed');
        }

      })
    );
  }

  ModRegister(modRegister:IAdminRegister): Observable<User>{
    return this.http.post<User>(MOD_REGISTER_URL, modRegister).pipe(
      tap({
        next: (user) => {
          this.toastrService.success(
            `Mod Registered`,
            'Success'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Registration Failed');
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

  ManualUserRegister(userRegister:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_MANUAL_REGISTER_URL, userRegister).pipe(
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

  getPendingUsers(): Observable<User[]>{
    return this.http.get<User[]>(GET_PENDING_USER_URL);
  }

  getRegisteredUsers(): Observable<User[]>{
    return this.http.get<User[]>(GET_REGISTERED_USER_URL);
  }

  approvePendingUser(user: User): Observable<User>{
    return this.http.patch<User>(APPROVE_PENDING_USER_URL, user).pipe(
      tap({
        next: (user) => {
          this.toastrService.success(
            `Approved ${user.Fullname}! Registration`,
            'Success'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Error');
        }

      })
    );
  }

  rejectPendingUser(user: User): Observable<User>{
    return this.http.delete<User>(REJECT_PENDING_USER_URL + user.id).pipe(
      tap({
        next: (user) => {
          this.toastrService.success(
            `Registration Rejected`,
            'Success'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Error');
        }

      })
    );
  }

  deletePendingUser(user: User): Observable<User>{
    return this.http.delete<User>(DELETE_REGISTERED_USER_URL + user.id).pipe(
      tap({
        next: (user) => {
          this.toastrService.success(
            `User Account Deleted`,
            'Success'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Error');
        }

      })
    );
  }

  Logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    this.router.navigateByUrl('/');
  }

  setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }

  isAuthenticated(): boolean {
    return (localStorage.getItem(USER_KEY) != null);
  }
}
