import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../service/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/user';
import {MessageService} from 'primeng/api';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService]

})
export class NavbarComponent implements OnInit {

  formLogin: FormGroup;
  formRegister: FormGroup;
  user: User = new User();
  isSubmitted: boolean;

  constructor(private service: LoginService, private formBuilder: FormBuilder,
              private router: Router, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {
    this.formConfigRegister();
    this.formConfigLogin();
  }
  /*Get all the values from the login form*/
  get valuesLogin() {
    return this.formLogin.controls;

  }
  /*Get all the values from the login form*/
  get valuesRegister() {
    return this.formRegister.controls;

  }

  /*Form fields validation*/
  formConfigLogin() {
    this.formLogin = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, [Validators.required]],
    });
  }
  /*Form fields validation*/
  formConfigRegister() {
    this.formRegister = this.formBuilder.group({
      name: [null, Validators.required],
      studentId: [null, Validators.required],
      emailRegister: [null, Validators.required],
      psw: [null, Validators.required],
      confirmPsw: [null, Validators.required]
    });
  }
  onSubmit(value: string) {
    this.isSubmitted = true;
  }

  /*Implementation login functionality and if OK is going to be redirected to the users page*/
  login() {
    if (this.formLogin.valid){
      this.user.email = this.valuesLogin.email.value;
      this.user.password = this.valuesLogin.password.value;
      (this.service.login(this.user).subscribe(
        data => {
          this.router.navigate(['users/homepage']);
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Wrong Credentials',
            detail: 'Login is invalid',
          });
          this.formLogin.reset();
          this.formLogin.controls.username.setErrors({invalid: true});
        }
      ));
    }
  }

  register(){
    if (this.formRegister.valid){
      debugger;
      if (this.valuesRegister.psw.value === this.valuesRegister.confirmPsw.value){

        this.user.name = this.valuesRegister.name.value;
        this.user.email = this.valuesRegister.emailRegister.value;
        this.user.password = this.valuesRegister.psw.value;
        this.service.register(this.user).subscribe(result => {
            this.formRegister.reset();
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: 'Success Register, Login now',
            });
          },
          error => {
            return false;
          });
      }else {
        this.messageService.add({
          severity: 'error',
          summary: 'Passwords don not match',
          detail: 'Register is invalid',
        });
      }
    }

  }

}

