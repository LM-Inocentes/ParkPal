import { Component } from '@angular/core';
import { ConfirmDeleteComponent } from '../component/confirm-delete/confirm-delete.component';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user';
import { MiscService } from '../services/misc.service';
import { NotificationsMsg } from '../shared/models/notifications';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  user = {} as User;
  userReports: NotificationsMsg[] = [];
  
  constructor( 
    private authService:AuthService, 
    private dialog: MatDialog, 
    private activatedRoute: ActivatedRoute,
    private miscService: MiscService
    ) {
      authService.userObservable.subscribe((newUser) => {
        this.user = newUser;
      });
      
  }

  ngOnInit(): void {
      this.authService.userObservable.subscribe((newUser) => {
        this.user = newUser;
      });
      this.miscService.getAllUserReports(this.user.id).subscribe(reports => {
        this.userReports = reports;
      });
  }

  clearNotifConfirmation(){
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '250px',
      data: { title: 'Confirmation', message: 'Are you sure you want to clear all your notification? [This will not be recovered]' },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     // User clicked "Yes", proceed with the delete operation
    //     // this.approveUser(user);
    //   }
    // });
  }

  confirmDelete(){
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '250px',
      data: { title: 'Confirmation', message: 'Do you really want to delete this notification? [This will not be recovered]' },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     // User clicked "Yes", proceed with the delete operation
    //     // this.approveUser(user);
    //   }
    // });
  }
}
