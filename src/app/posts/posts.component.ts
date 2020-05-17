import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../models/post';
import { OverlayPanel, SelectItem} from 'primeng';
import {Answer} from '../models/answer';
import {AnswerService} from '../service/answer.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private service: PostService, private answerService: AnswerService) {
  }

  posts: Post[];
  cols: any[];
  answers: Answer[];
  answersByPost: Answer[] = new Array();
  display1: boolean;
  display: boolean;
  subjectArray: SelectItem[];
  selectedPost: Post;

  ngOnInit(): void {
    console.log(this.listAll());
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

  showBasicDialog(event, element) {
    element.hide(event);
    this.display1 = true;
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
}
