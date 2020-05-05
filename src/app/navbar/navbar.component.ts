import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../service/login.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;
  validLogin = false;

  constructor(private service: LoginService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.formConfig();
  }
  /*Get all the values from the login form*/
  get values() {
    debugger;
    return this.form.controls; }

  /*Form fields validation*/
  formConfig() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required]],
    });
  }

  /*Implementation login functionality and if OK is going to be redirected to the users page*/
  login() {
    this.isSubmitted = true;
    (this.service.login(this.values.username.value, this.values.password.value).subscribe(
      data => {
        this.router.navigate(['/users']);
        this.validLogin = true;

      },
      error => {
        this.form.controls.username.setErrors({invalid: true});
      }
    ));
  }
}


