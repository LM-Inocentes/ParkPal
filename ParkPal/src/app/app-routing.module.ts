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
import { Admin } from './shared/models/admin';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path : '',title: 'ParkPal-Login',  component : LoginComponent},
  {path : 'register',title: 'Parkpal-register',  component : RegisterComponent},
  {
    path : '', 
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'pending-registrations',
        component: PendingRegistrationsComponent,
      },
      {
        path: 'user-registration',
        title: 'User Registration',
        component: UserRegistrationComponent,
      },
      {
        path: 'mod-registration',
        component: ModRegistrationComponent,
      },
      {
        path: 'admin-registration',
        component: AdminRegistrationComponent,
      },
      {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent,
      },
      {
        path: 'data-privacy',
        component: DataPrivacyComponent
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
      },
      // for the Profile
      {
        path: 'my-profile',
        title: 'User Profile',
        component: UserProfileComponent
      }
      
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
