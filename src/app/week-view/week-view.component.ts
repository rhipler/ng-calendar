import {Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CalendarEvent} from '../calendar-event';
import {CalendarService} from '../calendar.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.css']
})
export class WeekViewComponent implements OnInit {


  private weekdate: Date;
  private prevWeek: Date;
  private nextWeek: Date;


  private days: {date: Date, events: CalendarEvent[], wholeDayEvents: CalendarEvent[]}[] = Array();

  private hours: number[];


  public static sameday(date1: Date, date2: Date) {

    return (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate() );
  }




  constructor(private route: ActivatedRoute, private calendarService: CalendarService, private sanitizer: DomSanitizer) { }


  ngOnInit() {

    this.weekdate = new Date();

    this.route.paramMap.subscribe(
      params => {

        if (params.get('year') && params.get('month') && params.get('day')) {
          this.weekdate = new Date(+params.get('year'), +params.get('month') - 1, +params.get('day'));
        }

        // get the monday before weekdate, which is the beginning of this week
        const beginOfWeek = new Date(this.weekdate.getFullYear(), this.weekdate.getMonth(), this.weekdate.getDate() - (this.weekdate.getDay() + 6) % 7);

        this.prevWeek = new Date(beginOfWeek.getFullYear(), beginOfWeek.getMonth(), beginOfWeek.getDate() - 7);
        this.nextWeek = new Date(beginOfWeek.getFullYear(), beginOfWeek.getMonth(), beginOfWeek.getDate() + 7);

        this.days = Array();
        for (let i = 0; i < 7; i++) {
          this.days.push({
            date: new Date(beginOfWeek.getFullYear(), beginOfWeek.getMonth(), beginOfWeek.getDate() + i),
            events: [],
            wholeDayEvents: []
          });
        }


        // get the CalendarEvents for this week
        this.calendarService.getEvents(beginOfWeek, this.nextWeek).subscribe(events => {
          events.forEach(ev => {
              const theDay = this.days.find(day => WeekViewComponent.sameday(day.date, ev.begin));
              if (theDay) {
                if (ev.wholeDay) {
                  theDay.wholeDayEvents.push(ev);
                } else {
                  theDay.events.push(ev);
                }
              }
            }
          );
        });

      }
    );


    this.hours = [];
    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }

  }


  public eventPosition(event: CalendarEvent, i: number) {

    const minutes = (event.end.valueOf() - event.begin.valueOf() ) / 60_000;
    const begin = event.begin.getMinutes() * (40 / 60);

    return this.sanitizer.bypassSecurityTrustStyle('height: ' + minutes * (40 / 60) + 'px; width: 25%; left: ' + (i * 25) + '%; top: ' + begin + 'px');
  }


}
