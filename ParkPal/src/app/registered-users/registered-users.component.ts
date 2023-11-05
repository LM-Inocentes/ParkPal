import { Component } from '@angular/core';
import { User } from '../shared/models/user';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../component/image-modal/image-modal.component';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.scss']
})
export class RegisteredUsersComponent {
  RegisteredUsers: User[] = [];

  constructor( private authService:AuthService, private dialog: MatDialog ) {
  }

  ngOnInit(): void {
    this.authService.getRegisteredUsers().subscribe((newUser) => {
      this.RegisteredUsers = newUser;
    });
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
