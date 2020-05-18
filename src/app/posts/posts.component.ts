import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../models/post';
import { OverlayPanel, SelectItem} from 'primeng';
import {Answer} from '../models/answer';
import {AnswerService} from '../service/answer.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [MessageService]

})
export class PostsComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private service: PostService, private formBuilder: FormBuilder,
              private answerService: AnswerService, private messageService: MessageService) {
  }

  posts: Post[];
  post = new Post();
  answer = new Answer();
  cols: any[];
  answers: Answer[];
  answersByPost: Answer[] = new Array();
  displayAnswerDialog: boolean;
  display: boolean;
  subjectArray: SelectItem[];
  selectedPost: Post;
  form: FormGroup;
  formAnswer: FormGroup;
  text: string;

  ngOnInit(): void {
    this.formConfig();
    this.formAnswerConfig();
    this.listAll();
    this.getAnswers();
    this.cols = [
      {field: 'view'},
      {field: 'title'},
      {field: 'user'},
      {field: 'subjects'},
      {field: 'date'}
    ];

    this.subjectArray = [
      {label: 'All', value: null},
      {label: 'Network', value: 'NETWORKING'},
      {label: 'Prog', value: 'PROGRAMMING'},
      {label: 'Maths', value: 'MATHS'},
      {label: 'OS', value: 'OPERATION_SYSTEM'},
      {label: 'Web Dev', value: 'WEB_DEVELOPMENT'},
      {label: 'Design', value: 'WEB_DESIGN'},
      {label: 'Databases', value: 'DATABASE'}
    ];
  }

  /*Get all the values from the post form*/
  get values() {
    return this.form.controls;
  }

  /*Get all the values from the post form*/
  get answerValues() {
    return this.formAnswer.controls;
  }

  /*Form fields validation*/
  formConfig() {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      subject: [null, [Validators.required]],
      description: [null]
    });
  }

  /*Form fields validation*/
  formAnswerConfig() {
    this.formAnswer = this.formBuilder.group({
      answerDescription: [null]
    });
  }

  showBasicDialog(event, element) {
    element.hide(event);
    this.displayAnswerDialog = true;
  }
  showBasicDialog2() {
    this.display = true;
  }

  /*List all posts*/
  listAll() {
    this.service.listAll()
      .subscribe(result =>
        this.posts = result
      );
  }

  /*Get all Answers*/
  getAnswers() {
    this.answerService.getAnswers()
      .subscribe(result =>
        this.answers = result
      );
  }

  selectPost(event, post: Post, overlaypanel: OverlayPanel) {
    this.answersByPost = new Array();
    this.selectedPost = post;
    this.answers.forEach(answer => {
      if (answer.post.id === this.selectedPost.id) {
        this.answersByPost.push(answer);
      }
    });
    overlaypanel.toggle(event);
  }

  createPost() {
    if (this.form.valid) {
      debugger
      // cleanDescription.replace(/<p[^>]*>/gm, '');

      this.post.title = this.values.title.value;
      this.post.subjects = this.values.subject.value;
      this.post.description = this.values.description.value.replace(/<p[^>]*>/gm, '');
      this.post.user = JSON.parse(localStorage.getItem('currentUser'));
      this.post.creationDate = new Date();
      this.post.status = 'UNANSWERED'; // ANSWERED,UNANSWERED(DEFAULT);

      this.service.createPost(this.post).subscribe(result => {
          this.form.reset();
          this.listAll();
          this.display = false;

          this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Post Created',
          });
        },
        error => {
          return false;
        });
    }
  }

  createAnswer() {
    if (this.formAnswer.valid) {
      this.text = this.answerValues.answerDescription.value;
      this.answer.text = this.text;
      this.answer.post = this.selectedPost;
      this.answer.user = JSON.parse(localStorage.getItem('currentUser'));
      this.answer.creationDate = new Date();

      this.answerService.createAnswer(this.answer).subscribe(result => {
          this.form.reset();
          this.getAnswers();
          this.text = null;
          this.displayAnswerDialog = false;

          this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Answer Posted',
          });
        },
        error => {
          return false;
        });
    }
  }
}
