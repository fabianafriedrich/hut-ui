import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {UserHomepageComponent} from './user-homepage/user-homepage.component';
import {AuthGuard} from './auth/auth.guard';
import {PostsComponent} from './posts/posts.component';
import {ProfileComponent} from './profile/profile.component';


/*Angular path routes*/
const routes: Routes = [
  { path: 'users/welcome', component: WelcomeComponent },
  { path: 'users/homepage', component: UserHomepageComponent, canActivate: [AuthGuard] },
  { path: 'users/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'users/welcome', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
