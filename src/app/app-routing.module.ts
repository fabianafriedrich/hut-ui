import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {UserHomepageComponent} from './user-homepage/user-homepage.component';


/*Angular path routes*/
const routes: Routes = [
  // { path: 'users/navbar', component: NavbarComponent },
  { path: 'users/welcome', component: WelcomeComponent },
  { path: 'users/homepage', component: UserHomepageComponent },
  { path: '', redirectTo: 'users/welcome', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
