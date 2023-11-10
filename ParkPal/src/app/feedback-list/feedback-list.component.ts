import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MiscService } from '../services/misc.service';
import { User } from '../shared/models/user';
import { Feedback } from '../shared/models/feedback';
import { AuthService } from '../services/auth.service';

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
      id: this.user.id,
      type: this.form['type'].value,
      desc: this.form['desc'].value,
      name: this.user.Fullname
    }).subscribe(_ => {
      this.ngOnInit();
    });
  }

  deleteFeedback(id:string) {
    console.log(id);
    this.miscService.deleteFeedback(id).subscribe(_ => {
      this.ngOnInit();
    });
    
  }
}







