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


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>{
      this.authService.getRegisteredUsersByID(params['userID']).subscribe(regUser =>{
        this.user = regUser
      })
    })
  }

}
