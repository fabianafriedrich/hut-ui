import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import {Post} from '../models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];
  cols: any[];
  subjects: string[];

  constructor(private service: PostService) { }

  ngOnInit(): void {
    this.listAll();
    this.cols = [
      { field: 'title', header: 'Questions' },
      { field: 'user', header: 'Posted By' },
      { field: 'creationDate', header: 'Date' }
    ];
  }
  /*List all posts*/
  listAll(){
    this.service.listAll()
      .subscribe(result =>
        this.posts = result
      );
  }
}
