import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MiscService } from '../services/misc.service';
import { User } from '../shared/models/user';
import { Feedback } from '../shared/models/feedback';
import { AuthService } from '../services/auth.service';
import { ConfirmDeleteComponent } from '../component/confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  feedbackForm!: FormGroup;
  user!:User;
  isSubmitted = false;
  allFeedbacks: Feedback[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private miscService: MiscService,
    private dialog: MatDialog,
    private authService: AuthService
  ) 
  {
    this.feedbackForm = this.formBuilder.group({
      type: ['', Validators.required],
      desc: ['', Validators.required],
    });
    authService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    miscService.getallFeedbacks
  }

  ngOnInit(): void {
    this.miscService.getallFeedbacks().subscribe((newFeedbacks) => {
      this.allFeedbacks = newFeedbacks;
    });
  }

  get form() {
    return this.feedbackForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.feedbackForm.invalid) return;

    this.miscService.postFeedback({
      id: "",
      type: this.form['type'].value,
      desc: this.form['desc'].value,
      name: this.user.Fullname
    }).subscribe(_ => {
      this.ngOnInit();
    });
  }

  deleteFeedbackConfirmation(feedback: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '250px',
      data: { title: 'Confirmation', message: 'Are you sure you want to delete this feedback?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked "Yes", proceed with the delete operation
        this.deleteFeedback(feedback);
      }
    });
  }

  deleteFeedback(id:string) {
    console.log(id);
    this.miscService.deleteFeedback(id).subscribe(_ => {
      this.ngOnInit();
    });
    
  }
}







