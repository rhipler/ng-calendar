import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {CalendarService} from '../calendar.service';
import {CalendarEvent} from '../calendar-event';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css']
})
export class DayDetailComponent implements OnInit, OnChanges {


  @Input() day: Date;

  wholeDayEvents: CalendarEvent[];
  events: CalendarEvent[];

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    // console.log('onChanges');

    for (let propName in changes) {
      if (propName === 'day') {

        this.wholeDayEvents = Array();
        this.events = Array();

        if (this.day) {

          const from = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate(), 0, 0);
          const to = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() + 1, 0, 0);

          this.calendarService.getEvents(from, to).subscribe(events => {

            events.forEach(event => {
              if (event.wholeDay) {
                this.wholeDayEvents.push(event);
              } else {
                this.events.push(event);
              }
            });

          });

        }
      }
    }


  }

}
