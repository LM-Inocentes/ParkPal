import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { User } from '../shared/models/user';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../component/image-modal/image-modal.component';
import { Observable } from 'rxjs';



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
    let PendingUsersObservable : Observable<User[]>;

    this.activatedRoute.params.subscribe((params) => {
      if(params['searchTerm']){
        PendingUsersObservable = this.authService.searchPendingUsers(params['searchTerm']);
      }else{
        PendingUsersObservable = this.authService.getPendingUsers();
      }
      PendingUsersObservable.subscribe((PendingUsers) => {
        this.PendingUsers = PendingUsers;
      })
    })

    // this.authService.getPendingUsers().subscribe((newUser) => {
    //   this.PendingUsers = newUser;
    // });
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
  
}
