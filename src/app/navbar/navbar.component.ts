import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  displayLogin = false;
  displayRegister = false;

  ngOnInit(): void {
  }

  showLogin(){
    this.displayLogin = true;
  }
  showRegister(){
    this.displayRegister = true;
  }
}


