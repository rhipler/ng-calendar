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

  private event: CalendarEvent;
  private begintime: string;
  private endtime: string;
  private date: Date;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private calendarService: CalendarService) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe( params => {
      if (params.get('id')) {
        const id = +params.get('id');
        this.calendarService.getEvent(id).subscribe( event => {
            this.event = event;
            this.date = event.begin;

            this.begintime = ('0' + event.begin.getHours()).slice(-2) + ':' + ('0' + event.begin.getMinutes() ).slice(-2);
            this.endtime = ('0' + event.end.getHours()).slice(-2) + ':' + ('0' + event.end.getMinutes()).slice(-2);
          }
        );

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

    this.calendarService.updateEvent(this.event);

    this.goBack();
  }


  public cancel() {
    this.goBack();
  }


  goBack(): void {
    this.location.back();
  }


}
