import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { DataPrivacyComponent } from './data-privacy/data-privacy.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PendingRegistrationsComponent } from './pending-registrations/pending-registrations.component';
import { UserRegistrationComponent } from './manual-registration/user-registration/user-registration.component';
import { ModRegistrationComponent } from './manual-registration/mod-registration/mod-registration.component';
import { AdminRegistrationComponent } from './manual-registration/admin-registration/admin-registration.component';
import { User } from './shared/models/user';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';

const routes: Routes = [
  {path : '',title: 'ParkPal-Login',  component : LoginComponent},
  {path : 'register',title: 'Parkpal-register',  component : RegisterComponent},
  {
    path : '', 
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
        data: { title: 'DASHBOARD' },
      },
      {
        path: 'registered-users',
        title: 'Registered Users',
        component: RegisteredUsersComponent,
        data: { title: 'REGISTERED USERS' },
      },
      {
        path: 'pending-registrations',
        component: PendingRegistrationsComponent,
        title: 'Pending Registrations',
        data: { title: 'PENDING REGISTRATIONS' },
      },
      {
        path: 'user-registration',
        title: 'User Registration',
        component: UserRegistrationComponent,
        data: { title: 'USER REGISTRATION' },
      },
      {
        path: 'mod-registration',
        component: ModRegistrationComponent,
        title: 'Moderator Registration',
        data: { title: 'MODERATOR REGISTRATION' },
      },
      {
        path: 'admin-registration',
        component: AdminRegistrationComponent,
        title: 'Admin Registration',
        data: { title: 'ADMIN REGISTRATION' },
      },
      {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent,
        title: 'Terms and Conditions',
        data: { title: 'TERMS AND CONDITIONS' },
      },
      {
        path: 'data-privacy',
        component: DataPrivacyComponent,
        title: 'Data Privacy',
        data: { title: 'DATA PRIVACY' },
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
        title: 'Feedback',
        data: { title: 'FEEDBACK' },
      },
      {
        path: 'feedback-list',
        component: FeedbackListComponent,
        title: 'Feedback-list',
        data: { title: 'FEEDBACK LIST' },
      },
      // for the Profile
      {
        path: 'my-profile',
        title: 'User Profile',
        component: UserProfileComponent,
        data: { title: 'USER PROFILE' },
      },
      
    ],
    title: 'Dashboard', 
    component : AppNavigationComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
