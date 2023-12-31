import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user';
import { ImageModalComponent } from '../component/image-modal/image-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsMsg } from '../shared/models/notifications';
import { ActivatedRoute } from '@angular/router';
import { MiscService } from '../services/misc.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  panelOpenState = false;
  user!: User;
  intitials!: string;
  userReports: NotificationsMsg[] = [];

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private miscService: MiscService
  ) {

  }

  ngOnInit(): void {
    this.authService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    this.miscService.getAllUserReports(this.user.id).subscribe(reports => {
      this.userReports = reports;
    });
    this.authService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    this.authService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      this.calculateInitials();
    });
  }

  calculateInitials() {
    if (this.user && this.user.Fullname) {
      const nameParts = this.user.Fullname.split(' ');
      let initials = '';

      nameParts.forEach(part => {
        if (part.length > 0) {
          initials += part[0].toUpperCase();
        }
      });

      // Now 'initials' contains the user's initials.
      this.intitials = initials;
    }
  }
  openImageModal(imageUrl: string) {
    this.dialog.open(ImageModalComponent, {
      data: { imageUrl },
    });
  }

}
