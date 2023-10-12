import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MiscService } from '../services/misc.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user';
import { Feedback } from '../shared/models/feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  feedbackForm!: FormGroup;
  user!:User;
  isSubmitted = false;
  recentFeedbacks: Feedback[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private miscService: MiscService,
    private router: Router,
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
    miscService.getRecentFeedback
  }

  ngOnInit(): void {
    this.miscService.getRecentFeedback().subscribe((newFeedbacks) => {
      this.recentFeedbacks = newFeedbacks;
    });
  }

  get form() {
    return this.feedbackForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.feedbackForm.invalid) return;

    this.miscService.postFeedback({
      id: this.user.id,
      type: this.form['type'].value,
      desc: this.form['desc'].value,
      name: this.user.Fullname
    }).subscribe(_ => {
      this.ngOnInit();
    });
  }
}
