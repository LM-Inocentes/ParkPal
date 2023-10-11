import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss']
})
export class AppNavigationComponent {

  private breakpointObserver = inject(BreakpointObserver);

  user!:User;
  Firstname?:string;
  pageTitle: string = 'DASHBOARDS'; // Default page title

  // Initialize currentDate as null
  currentDay: string | null = null;
  currentDate: string | null = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private datePipe: DatePipe, 
    private authService:AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

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

    // Listen to route changes and set the page title accordingly
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setPageTitle();
      });
  }

  //START OF CHANGE TITLE CODE
  ngOnInit() {
    this.setPageTitle();
  }

  setPageTitle() {
    const childRoute = this.getChildRoute(this.activatedRoute);
    if (childRoute) {
      this.pageTitle = childRoute.snapshot.data['title']; //|| 'DASHBOARD';
    } else {
      this.pageTitle = 'DASHBOARDA';
    }
  }

  getChildRoute(route: ActivatedRoute): ActivatedRoute | null {
    if (route.firstChild) {
      return this.getChildRoute(route.firstChild);
    }
    return route;
  }
  //END OF CHANGE TITLE CODE

  logout(){
    this.authService.Logout();
  }

  get isAuth(){
    return this.user.token;
  }
}
