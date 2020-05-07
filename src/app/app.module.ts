import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { InputTextModule } from 'primeng/inputtext';
import {MessageModule, OverlayPanelModule, PanelMenuModule, ToastModule} from 'primeng';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import { MenuComponent } from './menu/menu.component';
import {SidebarModule} from 'primeng/sidebar';
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    UserHomepageComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    OverlayPanelModule,
    HttpClientModule,
    ReactiveFormsModule,
    PanelModule,
    SidebarModule,
    PanelMenuModule,
    ListboxModule,
    FormsModule,
    MessageModule,
    ToastModule,
    MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
