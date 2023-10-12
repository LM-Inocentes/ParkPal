import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user';

declare const myFunction: any;
@Component({
  selector: 'app-app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss']
})
export class AppNavigationComponent {
  callfun(){
    myFunction();
  }

  private breakpointObserver = inject(BreakpointObserver);

  user!:User;
  Firstname?:string;

  // Initialize currentDate as null
  currentDay: string | null = null;
  currentDate: string | null = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  constructor(private datePipe: DatePipe, private authService:AuthService) {

    authService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      if(this.isAuth){
        this.Firstname = this.user.Fullname.split(' ').at(0);
      }
    });
    // Get the current date
    const currentDateObj = new Date();

    // Format the date using a custom format without the comma
    const options1: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    const options2: Intl.DateTimeFormatOptions = {
      weekday: 'long',
    };
    const transformedDate = currentDateObj.toLocaleDateString(undefined, options1).replace(',', '');
    const transformedDay = currentDateObj.toLocaleDateString(undefined, options2).replace(',', '');

    // Assign the formatted date to currentDate
    this.currentDate = transformedDate;
    this.currentDay = transformedDay;


  }


  logout(){
    this.authService.Logout();
  }

  get isAuth(){
    return this.user.token;
  }
}
