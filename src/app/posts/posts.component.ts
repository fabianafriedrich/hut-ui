import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import {Post} from '../models/post';
import {SelectItem} from 'primeng';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];
  cols: any[];

  /*Menu side-bar*/
  display: boolean;
  subjectArray: SelectItem[];

  constructor(private service: PostService) { }

  ngOnInit(): void {
    this.listAll();

    this.cols = [
      { field: 'title', header: 'Questions' },
      { field: 'user', header: 'Posted By' },
      { field: 'subjects', header: 'Subject' },
      { field: 'date', header: 'Date' }
    ];

    this.subjectArray = [
      {label: 'All', value: null},
      {label: 'Networking', value: 'NETWORKING'},
      {label: 'Programming', value: 'PROGRAMMING'},
      {label: 'Maths', value: 'MATHS'},
      {label: 'Operation System', value: 'OPERATION_SYSTEM'},
      {label: 'Web Development', value: 'WEB_DEVELOPMENT'},
      {label: 'Web Design', value: 'WEB_DESIGN'},
      {label: 'Databases', value: 'DATABASE'}
    ];
  }

  /*List all posts*/
  listAll(){
    this.service.listAll()
      .subscribe(result =>
        this.posts = result
      );
  }

  // tableListBoxSelectEvent(event){
  //   this.selectedSubject = event.value.code;
  //   this.visibleSidebar1 = false;
  // }
}
