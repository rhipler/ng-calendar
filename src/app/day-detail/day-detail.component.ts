import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css']
})
export class DayDetailComponent implements OnInit {


  @Input() private day: Date;

  constructor() { }

  ngOnInit() {
    console.log('dayDetail init ' + this.day);
  }

}
