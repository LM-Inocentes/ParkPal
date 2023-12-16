import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../component/confirm-delete/confirm-delete.component';
import { MiscService } from '../services/misc.service';
import { NotificationsMsg } from '../shared/models/notifications';


@Component({
  selector: 'app-penalty-page-user',
  templateUrl: './penalty-page-user.component.html',
  styleUrls: ['./penalty-page-user.component.scss']
})
export class PenaltyPageUserComponent implements OnInit {
  user = {} as User;
  userReports: NotificationsMsg[] = [];
  initials!: string;
  warningmsg: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog, 
    private authService: AuthService,
    private miscService: MiscService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.authService.getRegisteredUsersByID(params['userID']).subscribe(regUser => {
        this.user = regUser;
      });
      this.miscService.getAllUserReports(params['userID']).subscribe(reports => {
        this.userReports = reports;
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
      return this.initials;
    }

    return ''; // Return an empty string if user or Fullname is not provided
  }

  suspendAccConfirm(){
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '250px',
      data: { title: 'Confirmation', message: 'Are you sure you want to suspend this account?' },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     // User clicked "Yes", proceed with the delete operation
    //     // this.approveUser(user);
    //   }
    // });
  }
  sendMessageConfirm(){
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '250px',
      data: { title: 'Confirmation', message: 'Are you sure you want to send this warning message? [Actions cannot be edited after you click "YES" for record puporses]' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked "Yes", proceed with the delete operation
        this.sendWarningMessage(this.warningmsg);
      }
    });
  }

  sendWarningMessage(warningmsg:string){
    const report: NotificationsMsg = {
      userID: this.user.id,
      description: warningmsg,
    }
    this.miscService.postWarning(report).subscribe(_ => {
      this.ngOnInit();
    });
  }

  unsuspendAccount(){
    
  }

  suspendAccount(){
    
  }

  deleteUser(user: User) {
    this.authService.deletePendingUser(user).subscribe(_ => {
      this.ngOnInit();
    });
  }
}

