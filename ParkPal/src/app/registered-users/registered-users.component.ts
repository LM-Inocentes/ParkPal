import { Component } from '@angular/core';
import { User } from '../shared/models/user';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../component/image-modal/image-modal.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmDeleteComponent } from '../component/confirm-delete/confirm-delete.component';

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

  deleteUserConfirmation(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '250px',
      data: { title: 'Confirmation', message: 'Are you sure you want to delete this user?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked "Yes", proceed with the delete operation
        this.deleteUser(user);
      }
    });
  }

  deleteUser(user: User) {
    this.authService.deletePendingUser(user).subscribe(_ => {
      this.ngOnInit();
    });
  }
  
}
