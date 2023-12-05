import { Component } from '@angular/core';
import { User } from '../shared/models/user';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-penalty-page',
  templateUrl: './penalty-page.component.html',
  styleUrls: ['./penalty-page.component.scss']
})
export class PenaltyPageComponent {
  RegisteredUserList: User[] = [];

  constructor(
    private authService:AuthService,
  ) {}
 
  ngOnInit(): void{
    let RegisteredUserListObservable!: Observable<User[]>;

    
    RegisteredUserListObservable.subscribe((RegisteredUserList) => {
      this.RegisteredUserList = this.RegisteredUserList;
    }
    )
   

    
  }

}
