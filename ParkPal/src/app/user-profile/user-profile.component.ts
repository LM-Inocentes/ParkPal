import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  panelOpenState = false;
  user!:User;
  Firstname?:string;
  userID?:string;

  constructor( authService:AuthService ) {
    authService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      if(this.isAuth){
        this.Firstname = this.user.Fullname.split(' ').at(0);
        console.log(this.user);
        this.userID = this.user.id.split(' ').at(0);;
      }
    });
  }
  
  get isAuth(){
    return this.user.token;
  }
}
