import { Component, OnInit } from '@angular/core';
import {PostService} from '../service/post.service';

interface Subjects {
  name: string;
  code: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  display: boolean;
  visibleSidebar1: boolean;

  subjects: Subjects[];

  selectedSubject: Subjects;

  selectedSsubjects: Subjects[];

  constructor(private postService: PostService) {
    this.subjects = [
      {name: 'Networking', code: 'NETWORKING'},
      {name: 'Programming', code: 'PROGRAMMING'},
      {name: 'Maths', code: 'MATHS'},
      {name: 'Operation System', code: 'OPERATION_SYSTEM'},
      {name: 'Web Development', code: 'WEB_DEVELOPMENT'},
      {name: 'Web Design', code: 'WEB_DESIGN'},
      {name: 'Databases', code: 'DATABASE'}
    ];
  }

  ngOnInit(): void {
  }

  tableListBoxSelectEvent(event){
    this.visibleSidebar1 = false;
  }

}
