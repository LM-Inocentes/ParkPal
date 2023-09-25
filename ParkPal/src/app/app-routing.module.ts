import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';

const routes: Routes = [
  {path : '',title: 'ParkPal-Login',  component : LoginComponent},
  {path : 'register',title: 'Parkpal-register',  component : RegisterComponent},
  {path : 'app-navigation', title: 'App Navigation', component : AppNavigationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
