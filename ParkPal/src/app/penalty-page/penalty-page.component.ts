import { Component } from '@angular/core';
import { User } from '../shared/models/user';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-penalty-page',
  templateUrl: './penalty-page.component.html',
  styleUrls: ['./penalty-page.component.scss']
})
export class PenaltyPageComponent {
  UserLists: User[] = [];
  intitials!: string;

  constructor(private authService: AuthService, private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let RegisteredUsersObservableList: Observable<User[]>;
    this.activatedRoute.params.subscribe(()=> {
      RegisteredUsersObservableList = this.authService.getRegisteredUsers();
      RegisteredUsersObservableList.subscribe((UserLists) => {
        this.UserLists = UserLists;
      })
      

    })
  }

  calculateInitials(user: User){
    if (user && user.Fullname) {
      const nameParts = user.Fullname.split(' ');
      let initials = '';

      nameParts.forEach(part => {
        if (part.length > 0) {
          initials += part[0].toUpperCase();
        }
      });

      // Now 'initials' contains the user's initials.
      this.intitials = initials;
    }
  }


}
