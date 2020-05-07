import { Component, OnInit } from '@angular/core';

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

  constructor() {
    this.subjects = [
      {name: 'Networking', code: 'NW'},
      {name: 'Programming', code: 'PG'},
      {name: 'Maths', code: 'MT'},
      {name: 'Operation System', code: 'OS'},
      {name: 'Web Development', code: 'WDP'},
      {name: 'Web Design', code: 'WDG'},
      {name: 'Databases', code: 'DB'}

  ];
  }

  ngOnInit(): void {
  }

}
