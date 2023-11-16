import { Component } from '@angular/core';
import { User } from '../shared/models/user';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../component/image-modal/image-modal.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.scss']
})
export class RegisteredUsersComponent {
  RegisteredUsers: User[] = [];

  constructor( private authService:AuthService, private dialog: MatDialog, private activatedRoute: ActivatedRoute ) {
  }

  ngOnInit(): void {
    let RegisteredUsersObservable: Observable<User[]>;
    
    this.activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']){
        RegisteredUsersObservable = this.authService.searchRegisteredUsers(params['searchTerm']);
      }
      else{
        RegisteredUsersObservable = this.authService.getRegisteredUsers();
      }
      RegisteredUsersObservable.subscribe((RegisteredUsers) => {
        this.RegisteredUsers = RegisteredUsers;
      })
    })
  }

  openImageModal(imageUrl: string) {
    this.dialog.open(ImageModalComponent, {
      data: { imageUrl },
    });
  }

  deleteUser(user: User) {
    this.authService.deletePendingUser(user).subscribe(_ => {
      this.ngOnInit();
    });
  }
  
}
