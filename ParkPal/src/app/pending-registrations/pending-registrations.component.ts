import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { User } from '../shared/models/user';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../component/image-modal/image-modal.component';
import { Observable } from 'rxjs';
import { ConfirmDeleteComponent } from '../component/confirm-delete/confirm-delete.component';



@Component({
  selector: 'app-pending-registrations',
  templateUrl: './pending-registrations.component.html',
  styleUrls: ['./pending-registrations.component.scss'],
  
})
export class PendingRegistrationsComponent {
  PendingUsers: User[] = [];

  constructor( 
    private authService:AuthService, 
    private dialog: MatDialog, 
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let PendingUsersObservable: Observable<User[]>;
    this.activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']){
        PendingUsersObservable = this.authService.searchPendingUsers(params['searchTerm']);

      }else{
        PendingUsersObservable = this.authService.getPendingUsers();
      }
      PendingUsersObservable.subscribe((PendingUsers) => {
        this.PendingUsers = PendingUsers;
      })
    })
  }

  openImageModal(imageUrl: string) {
    this.dialog.open(ImageModalComponent, {
      data: { imageUrl },
    });
  }

  approveUser(user: User) {
    this.authService.approvePendingUser(user).subscribe(_ => {
      this.ngOnInit();
    });
  }

  rejectUser(user: User) {
    this.authService.rejectPendingUser(user).subscribe(_ => {
      this.ngOnInit();
    });
  }

  approveUserConfirmation(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '250px',
      data: { title: 'Confirmation', message: 'Are you sure you want to approve this user application?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked "Yes", proceed with the delete operation
        this.approveUser(user);
      }
    });
  }

  rejectUserConfirmation(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '250px',
      data: { title: 'Confirmation', message: 'Are you sure you want to reject this user application?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked "Yes", proceed with the delete operation
        this.rejectUser(user);
      }
    });
  }
  
}
