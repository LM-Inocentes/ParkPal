import { Component, NgModule } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user';
import { MiscService } from '../services/misc.service';
import { Park } from '../shared/models/park';
import { timer } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  user!:User;
  Firstname?: string;
  dashSuspended?: boolean;
  mapImagePath: string = 'assets/overall-map.png';
  mapState: number = 0;

  constructor( authService:AuthService, private miscService:MiscService ) {
    authService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      if(this.isAuth){
        this.Firstname = this.user.Fullname.split(' ').at(0);
      }
    });
    if(this.user.Level == 1){
      authService.getRegisteredUsersByID(this.user.id).subscribe((user) => {
        this.dashSuspended = user.isSuspended;
      });
    }
    this.miscService.mapState$.subscribe((state) => {
      this.updateMapState(state);
    });
  }
  
  get isAuth(){
    return this.user.token;
  }

  updateMapState(state: number) {
    if (state == 0) {
      this.mapImagePath = 'assets/overall-map.png';
      this.mapState = 0;
    } else if (state == 1) {
      this.mapImagePath = 'assets/area1-map.png';
      this.mapState = 1;
    } else if (state == 2) {
      this.mapImagePath = 'assets/area2-map.png';
      this.mapState = 2;
    } else if (state == 3) {
      this.mapImagePath = 'assets/area3-map.png';
      this.mapState = 3;
    }
  }

  // createParks() {
  //   let Index = 82;
  //   for (let i = 0; i < Index; i++) {
  //     this.miscService.postParks(i.toString()).subscribe(
  //       (response) => {
  //         console.log(`Park ${i} created successfully:`, response);
  //       },
  //       (error) => {
  //         console.error(`Error creating park ${i}:`, error);
  //       }
  //     );
  
  //     // Introduce a delay between requests (e.g., 500 milliseconds)
  //     // Adjust the delay as needed based on your requirements.
  //     if (i < Index - 1) {
  //       timer(2000).subscribe();
  //     }
  //   }
  // }
} 
