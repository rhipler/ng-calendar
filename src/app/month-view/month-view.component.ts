import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CalendarEvent} from '../calendar-event';

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
  private days: {date: Date, event: CalendarEvent}[] = new Array();



  constructor(private route: ActivatedRoute) { }

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

    this.days = new Array();

    const fillDaysBefore = (this.monthDate.getDay() + 6) % 7;
    for (let i = fillDaysBefore; i > 0; i--) {
      const tmpdate = new Date(this.monthDate.getFullYear(), this.monthDate.getMonth(), this.monthDate.getDate() - i);
      this.days.push({date: tmpdate, event: null});
    }


    let loopDate = new Date(this.monthDate.getFullYear(), this.monthDate.getMonth());
    while (loopDate.getMonth() === this.monthDate.getMonth() ) {
      this.days.push({date: new Date(loopDate), event: null});
      loopDate.setDate(loopDate.getDate() + 1);
    }


    const fillDaysAfter = (8 - loopDate.getDay()) % 7;
    for (let i = 0; i < fillDaysAfter; i++) {
      this.days.push({date: new Date(loopDate), event: null});
      loopDate.setDate(loopDate.getDate() + 1);
    }

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
