import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Admin } from '../shared/models/admin';

@Component({
  selector: 'app-app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss']
})
export class AppNavigationComponent {

  private breakpointObserver = inject(BreakpointObserver);

  admin!:Admin;
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

    authService.userObservable.subscribe((newAdmin) => {
      this.admin = newAdmin;
      if(this.isAuth){
        this.Firstname = this.admin.Fullname.split(' ').at(0);
        console.log(this.admin);
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
    this.authService.logout();
  }

  get isAuth(){
    return this.admin.token;
  }
}
