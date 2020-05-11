import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../service/profile.service';
import {User} from '../models/user';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]

})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  user: User;
  isSubmitted: boolean;


  constructor(private service: ProfileService, private formBuilder: FormBuilder,
              private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(JSON.parse(localStorage.getItem('currentUser')));

  }

  ngOnInit(): void {
    this.formConfig();
  }
  /*Get all the values from the login form*/
  get values() {
    return this.form.controls;

  }
  /*Form fields validation*/
  formConfig() {
    this.form = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.required],
      newPsw: [null, Validators.required],
      confirmNewPsw: [null, Validators.required]
    });
  }
  onSubmit(value: string) {
    this.isSubmitted = true;
  }
  update(){
    if (this.form.valid){
      if (this.values.newPsw.value === this.values.confirmNewPsw.value){
        this.user.name = this.values.name.value;
        this.user.email = this.values.email.value;
        this.user.password = this.values.newPsw.value;
        this.service.update(this.user).subscribe(result => {
            this.form.reset();
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: 'Success Updating User',
            });
          },
          error => {
            return false;
          });
      }else {
        this.messageService.add({
          severity: 'error',
          summary: 'Passwords don not match',
          detail: 'Update password is invalid',
        });
      }
    }

  }

}
