import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-penalty-page-user',
  templateUrl: './penalty-page-user.component.html',
  styleUrls: ['./penalty-page-user.component.scss']
})
export class PenaltyPageUserComponent implements OnInit {
  user = {} as User;
  initials!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['userID']);
      this.authService.getRegisteredUsersByID(params['userID']).subscribe(regUser => {
        this.user = regUser;
      });
    });
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
      console.log(this.initials);

      return this.initials;
    }

    return ''; // Return an empty string if user or Fullname is not provided
  }
}

