import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  user!:User;
  Firstname?:string;

  constructor( authService:AuthService ) {
    authService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      if(this.isAuth){
        this.Firstname = this.user.Fullname.split(' ').at(0);
        console.log(this.user);
      }
    });
  }
  
  get isAuth(){
    return this.user.token;
  }
}
