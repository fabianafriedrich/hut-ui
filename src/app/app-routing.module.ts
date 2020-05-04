import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {WelcomeComponent} from './welcome/welcome.component';


/*Angular path routes*/
const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'welcome', component: WelcomeComponent },
  // { path: 'users', component: UserComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
