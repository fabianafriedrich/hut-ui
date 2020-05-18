import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {UserHomepageComponent} from './user-homepage/user-homepage.component';
import {AuthGuard} from './auth/auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {DashboardComponent} from './dashboard/dashboard.component';


/*Angular path routes*/
const routes: Routes = [
  { path: 'users/welcome', component: WelcomeComponent },
  { path: 'users/homepage', component: UserHomepageComponent, canActivate: [AuthGuard] },
  { path: 'users/about-us', component: AboutUsComponent, canActivate: [AuthGuard] },
  { path: 'users/contact-us', component: ContactUsComponent, canActivate: [AuthGuard] },
  { path: 'users/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'users/dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

  { path: '', redirectTo: 'users/welcome', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
