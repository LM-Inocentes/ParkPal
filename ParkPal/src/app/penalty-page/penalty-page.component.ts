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
  initials!: string;

  constructor(private authService: AuthService, private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let RegisteredUsersObservable: Observable<User[]>;
    this.activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']){
        RegisteredUsersObservable = this.authService.searchRegisteredUsers(params['searchTerm']);
      }else{
        RegisteredUsersObservable = this.authService.getRegisteredUsers();
      }
      RegisteredUsersObservable.subscribe((RegisteredUsers) => {
        this.UserLists = RegisteredUsers;
      })
    })
  }

  calculateInitials(user: User): string {
    let initials = '';

    if (user && user.Fullname) {
      const nameParts = user.Fullname.split(' ');

      nameParts.forEach(part => {
        if (part.length > 0) {
          initials += part[0].toUpperCase();
        }
      });

      // Now 'initials' contains the user's initials.
      this.initials = initials;
      return this.initials;
    }

    return ''; // Return an empty string if user or Fullname is not provided
  }

  


}
