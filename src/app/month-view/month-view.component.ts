import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CalendarEvent} from '../calendar-event';
import {CalendarService} from '../calendar.service';
import {WeekViewComponent} from '../week-view/week-view.component';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit {


  private monthDate: Date;
  private prevMonth: Date;
  private nextMonth: Date;

  private selected: Date;
  private weekYear: number;
  private weekMonth: number;
  private weekDay: number;


  // days of the month, shown in the view
  private days: {date: Date, events: CalendarEvent[], wholeDayEvents: CalendarEvent[] }[] = Array();


  constructor(private route: ActivatedRoute, private calendarService: CalendarService) { }

  ngOnInit() {
    console.log('init  monthView');


    this.route.paramMap.subscribe(
      params => {
        // init default date with current month
        this.monthDate = new Date(new Date().getFullYear(), new Date().getMonth(),1);

        if (params.get('year') && params.get('month') ) {
          this.monthDate = new Date( +params.get('year'), +params.get('month') - 1);
        }

        this.prevMonth = new Date(this.monthDate.getFullYear(), this.monthDate.getMonth() - 1);
        this.nextMonth = new Date(this.monthDate.getFullYear(), this.monthDate.getMonth() + 1);

        this.weekYear = this.monthDate.getFullYear();
        this.weekMonth = this.monthDate.getMonth();
        this.weekDay = 1;

        this.setDays();
      }
    );

  }


  setDays() {

    this.days = Array();

    const fillDaysBefore = (this.monthDate.getDay() + 6) % 7;
    for (let i = fillDaysBefore; i > 0; i--) {
      const tmpdate = new Date(this.monthDate.getFullYear(), this.monthDate.getMonth(), this.monthDate.getDate() - i);
      this.days.push({date: tmpdate, events: Array(), wholeDayEvents: Array()});
    }


    let loopDate = new Date(this.monthDate.getFullYear(), this.monthDate.getMonth());
    while (loopDate.getMonth() === this.monthDate.getMonth() ) {
      this.days.push({date: new Date(loopDate), events: Array(), wholeDayEvents: Array()});
      loopDate.setDate(loopDate.getDate() + 1);
    }


    const fillDaysAfter = (8 - loopDate.getDay()) % 7;
    for (let i = 0; i < fillDaysAfter; i++) {
      this.days.push({date: new Date(loopDate), events: Array(), wholeDayEvents: Array()});
      loopDate.setDate(loopDate.getDate() + 1);
    }

    const from = new Date(this.monthDate.getFullYear(), this.monthDate.getMonth(), 1);
    const to = new Date(this.monthDate.getFullYear(), this.monthDate.getMonth() + 1, 1);


    this.calendarService.getEvents(from, to).subscribe( events => {

      events.forEach(event => {
          const theDay = this.days.find(day => WeekViewComponent.sameday(event.begin, day.date));
          if (theDay) {
            if (event.wholeDay) {
              theDay.wholeDayEvents.push(event);
            } else {
              theDay.events.push(event);
            }
          }
        }
      );

    });

  }


  dayselected(date: Date) {
    if (date.getMonth() === this.monthDate.getMonth() ) {
      this.selected = date;
      this.weekYear = date.getFullYear();
      this.weekMonth = date.getMonth();
      this.weekDay = date.getDate();
    }
    console.log('day selected ' + date);
  }


}
