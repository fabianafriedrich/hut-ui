import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../service/profile.service';
import {User} from '../models/user';
import {MessageService} from 'primeng/api';
import {LoginService} from '../service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]

})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  formPassword: FormGroup;
  user: User;
  isSubmitted: boolean;
  updateValid = false;
  readonly = true;


  constructor(private service: ProfileService, private serviceLogin: LoginService, private formBuilder: FormBuilder,
              private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(JSON.parse(localStorage.getItem('currentUser')));

  }

  ngOnInit(): void {
    this.formConfig();
    this.formChangePassword();
  }
  /*Get all the values from the login form*/
  get values() {
    return this.form.controls;
  }
  /*Get all the values from the login form*/
  get valuesPasswords() {
    return this.formPassword.controls;
  }
  /*Form fields validation*/
  formChangePassword() {
    this.formPassword = this.formBuilder.group({
      password: [null, Validators.required],
      newPassword: [null, Validators.required],
    });
  }

  /*Form fields validation*/
  formConfig() {
    this.form = this.formBuilder.group({
      name: [null],
      email: [null],
      studentId: [null],
    });
  }
  updateCheck(){
    if (this.values.name.value.touch || this.values.name.value.dirty
      || this.values.email.value.touch || this.values.email.value.dirty){
      this.updateValid = true;
    }
  }
  onSubmit(value: string) {
    this.isSubmitted = true;
  }
  updatePassword(){
    if (this.valuesPasswords.password.value !== null && this.valuesPasswords.newPassword.value !== null ){
      if (this.valuesPasswords.password.value === this.valuesPasswords.newPassword.value){
        this.user.password = this.valuesPasswords.password.value;
      }else {
        this.messageService.add({
          severity: 'error',
          summary: 'Passwords do not match',
          detail: 'Passwords invalid',
        });
        return false;
      }
    }
    this.service.update(this.user).subscribe(result => {
        this.form.reset();
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: 'Success Updating User Password, Login again please',
        });
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Invalid Inputs',
          detail: 'Information is invalid',
        });
        return false;
      });
    setTimeout(() => {
      this.serviceLogin.logOut();
      this.router.navigate(['users/welcome']);
      }, 1000
    );

  }

    update(){
    if (this.values.name.value !== this.user.name && this.values.name.value !== null && this.values.name.value !== ''){
      this.user.name = this.values.name.value;
    }
    this.service.update(this.user).subscribe(result => {
        this.form.reset();
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: 'Success Updating User',
        });
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Invalid Inputs',
          detail: 'Information is invalid',
        });
        return false;
      });
  }

}
