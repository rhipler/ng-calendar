import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { CalendarEvent} from '../calendar-event';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.css']
})
export class WeekViewComponent implements OnInit {


  private weekdate: Date;
  private prevWeek: Date;
  private nextWeek: Date;


  private days: {date: Date, events: CalendarEvent[]}[] = new Array();

  private hours: number[];


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.weekdate = new Date();

    this.route.paramMap.subscribe(
      params => {

        if (params.get('year') && params.get('month') && params.get('day')) {
          this.weekdate = new Date(+params.get('year'), +params.get('month') - 1, +params.get('day'));
        }

        // get the monday before weekdate, which is the beginning of this the week
        const beginOfWeek = new Date(this.weekdate.getFullYear(), this.weekdate.getMonth(), this.weekdate.getDate() - (this.weekdate.getDay() + 6) % 7);

        this.prevWeek = new Date(beginOfWeek.getFullYear(), beginOfWeek.getMonth(), beginOfWeek.getDate() - 7);
        this.nextWeek = new Date(beginOfWeek.getFullYear(), beginOfWeek.getMonth(), beginOfWeek.getDate() + 7);

        this.days = Array();
        for (let i = 0; i < 7; i++) {
          this.days.push({date: new Date(beginOfWeek.getFullYear(), beginOfWeek.getMonth(), beginOfWeek.getDate() + i), events: null});
        }
      }
    );


    this.hours = Array();
    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }

  }


}
