import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { DataPrivacyComponent } from './data-privacy/data-privacy.component';
import { FeedbackComponent } from './feedback/feedback.component';

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
