import {Component, OnInit } from '@angular/core';
import {CalendarEvent} from '../calendar-event';
import {CalendarService} from '../calendar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  event: CalendarEvent;
  begintime: string;
  endtime: string;
  date: Date;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private calendarService: CalendarService) {
  }

  ngOnInit() {


    this.route.paramMap.subscribe( params => {
      if (params.get('id')) {
        const id = +params.get('id');
        this.calendarService.getEvent(id).subscribe(event => {
            if (event) {
              this.event = event;
              this.date = event.begin;

              this.begintime = ('0' + event.begin.getHours()).slice(-2) + ':' + ('0' + event.begin.getMinutes()).slice(-2);
              this.endtime = ('0' + event.end.getHours()).slice(-2) + ':' + ('0' + event.end.getMinutes()).slice(-2);
            }
          }
        );

      } else {
        if ( params.get('year') && params.get('month') && params.get('day') ) {
          // create new
          this.date = new Date( +params.get('year'), +params.get('month') - 1, +params.get('day'));
          this.event = new CalendarEvent();
          this.event.id = 0;
          this.begintime = '08:00';
          this.endtime = '11:00';
        };
      }
    });

  }


  public save() {

    if (this.event.wholeDay) {

      this.event.begin = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 0, 0);
      this.event.end = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 23, 59);

    } else {

      let hours = +this.begintime.slice(0, 2);
      let minutes = +this.begintime.slice(3, 5);
      this.event.begin = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), hours, minutes);

      hours = +this.endtime.slice(0, 2);
      minutes = +this.endtime.slice(3, 5);
      this.event.end = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), hours, minutes);
    }

    if (this.event.id > 0) {
      this.calendarService.updateEvent(this.event);
    } else {
      this.calendarService.addEvent(this.event);
    }

    this.goBack();
  }


  public cancel() {
    this.goBack();
  }


  goBack(): void {
    this.location.back();
  }


}
