import {Component, OnInit, ViewChild} from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {EventService} from '../service/event.service';
import {FullCalendar} from 'primeng';

@Component({
  selector: 'app-fullcalendar',
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.css']
})
export class FullcalendarComponent implements OnInit {

  events: any[];

  options: any;

  showModal: boolean;

  eventTitle: string;
  eventDescription: string;

  @ViewChild('fc') fc: FullCalendar;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    // this.eventService.getEvents().subscribe(events => {
    //   this.events = events;
    // });
    this.showModal = false;
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      events: [
        {title: 'Angular classes', date: '2020-05-01T16:00:00', description: 'This is a Angular Course'},
        {title: 'Building an Application with Spring Boot', date: '2020-05-11T15:30:00', description: 'Start building an new app'},
        {title: 'Scrum meeting', date: '2020-05-16T16:00:00', description: 'Scrum meeting at 4pm'},
        {title: 'Java meeting', date: '2020-05-16T13:00:00', description: 'Java Interview today at 1pm'}
        ],
      editable: true,
      eventClick: this.handleDateClick.bind(this)
    };
  }

  handleDateClick(dateClicked) {
    this.eventTitle = dateClicked.event.title;
    this.eventDescription = dateClicked.event.extendedProps.description;
    this.showModal = true;
  }

  hideModal() {
    this.showModal = false;
  }
  // Methods of the underlying calendar instance is accessible using the reference of the components getCalendar() API.
  gotoDate(date: Date) {
    this.fc.getCalendar().gotoDate(date);
  }

}
