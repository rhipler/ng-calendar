import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {CalendarService} from '../calendar.service';
import {CalendarEvent} from '../calendar-event';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css']
})
export class DayDetailComponent implements OnInit, OnChanges {


  @Input() private day: Date;

  private wholeDayEvents: CalendarEvent[];
  private events: CalendarEvent[];

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    console.log('dayDetail init ' + this.day);
  }

  ngOnChanges(changes: SimpleChanges) {

    console.log('onChanges');

    for (let propName in changes) {
      if (propName === 'day') {

        this.wholeDayEvents = Array();
        this.events = Array();

        if (this.day) {

          const from = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate(), 0, 0);
          const to = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate() + 1, 0, 0);

          this.calendarService.getEvents(from, to).subscribe(events => {

            events.forEach(event => {
              console.log('Event ' + event.name);
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
