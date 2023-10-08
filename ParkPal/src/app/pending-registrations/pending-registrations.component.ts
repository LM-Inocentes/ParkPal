import { Component } from '@angular/core';
import { User } from '../shared/models/user';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../component/image-modal/image-modal.component';

@Component({
  selector: 'app-pending-registrations',
  templateUrl: './pending-registrations.component.html',
  styleUrls: ['./pending-registrations.component.scss'],
  
})
export class PendingRegistrationsComponent {

  PendingUsers: User[] = [];
  displayedColumns: string[] = ['id', 'fullname', 'email', 'ORdoc', 'CRdoc', 'StudyLoad', 'IDdoc', 'Payment', 'VMake', 'VModel', 'VPlateNo', 'actions'];

  constructor( private authService:AuthService, private dialog: MatDialog ) {
  }

  ngOnInit(): void {
    this.authService.getPendingUsers().subscribe((newUser) => {
      this.PendingUsers = newUser;
    });
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
