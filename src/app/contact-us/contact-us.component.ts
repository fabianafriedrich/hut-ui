import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../service/contact.service';
import {User} from '../models/user';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers: [MessageService]

})
export class ContactUsComponent implements OnInit {

  form: FormGroup;
  user = new User();

  constructor(private formBuilder: FormBuilder, private service: ContactService, private messageService: MessageService ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(JSON.parse(localStorage.getItem('currentUser')));

  }

  ngOnInit() {
    this.formConfig();
  }
  /*Get all the values from the login form*/
  get values() {
    return this.form.controls;

  }

  /*Form fields validation*/
  formConfig() {
    this.form = this.formBuilder.group({
      name: [ this.user.name, Validators.required],
      email: [this.user.email, Validators.required],
      message: [null, [Validators.required]],
    });
  }
  sendEamail(){
    debugger
    if (this.form.valid){
        this.user.name = this.values.name.value;
        this.user.email = this.values.email.value;
        this.user.mailMessage = this.values.message.value;
        this.service.sendEmail(this.user).subscribe(result => {
            this.form.reset();
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: 'Message sent, Thank you',
            });
          },
          error => {
            return false;
          });
      }

  }

}
