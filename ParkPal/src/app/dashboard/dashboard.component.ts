import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Admin } from '../shared/models/admin';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  admin!:Admin;
  Firstname?:string;

  constructor(private authService:AuthService) {
    authService.adminObservable.subscribe((newAdmin) => {
      this.admin = newAdmin;
      if(this.isAuth){
        this.Firstname = this.admin.Fullname.split(' ').at(0);
        console.log(this.admin);
      }
    });
  }
  
  get isAuth(){
    return this.admin.token;
  }
}
