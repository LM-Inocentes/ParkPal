import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { InputComponent } from './input/input.component';import {MatGridListModule} from '@angular/material/grid-list';
import { DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { DataPrivacyComponent } from './data-privacy/data-privacy.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { LoadingComponent } from './component/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { PendingRegistrationsComponent } from './pending-registrations/pending-registrations.component';
import { UserRegistrationComponent } from './manual-registration/user-registration/user-registration.component';
import { ModRegistrationComponent } from './manual-registration/mod-registration/mod-registration.component';
import { AdminRegistrationComponent } from './manual-registration/admin-registration/admin-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { ImageModalComponent } from './component/image-modal/image-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PendingRegistrationSearchComponent } from './component/pending-registration-search/pending-registration-search.component';
import { RegisteredUsersSearchComponent } from './component/registered-users-search/registered-users-search.component';
import { ConfirmDeleteComponent } from './component/confirm-delete/confirm-delete.component';
import { PenaltyPageUserComponent } from './penalty-page-user/penalty-page-user.component';
import { VerificationComponent } from './component/verification/verification.component';
import { CommonModule } from '@angular/common';
import { PenaltyPageComponent } from './penalty-page/penalty-page.component';
import { OccupyModalComponent } from './component/occupy-modal/occupy-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AppNavigationComponent,
    InputComponent,
    DashboardComponent,
    TermsAndConditionsComponent,
    DataPrivacyComponent,
    FeedbackComponent,
    LoadingComponent,
    PendingRegistrationsComponent,
    UserRegistrationComponent,
    ModRegistrationComponent,
    AdminRegistrationComponent,
    UserProfileComponent,
    ImageModalComponent,
    FeedbackListComponent,
    RegisteredUsersComponent,
    NotificationsComponent,
    PendingRegistrationSearchComponent,
    RegisteredUsersSearchComponent,
    ConfirmDeleteComponent,
    PenaltyPageUserComponent,
    VerificationComponent,
    PenaltyPageComponent,
    OccupyModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatTableModule,
    FormsModule,
    MatDialogModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
    }),
  ],
  providers: [
    DatePipe, { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
