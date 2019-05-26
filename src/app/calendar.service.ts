import { Injectable } from '@angular/core';
import { CalendarEvent} from './calendar-event';
import { Observable, of} from 'rxjs';
import { MOCKEVENTS} from './mock-events';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }


  private events: CalendarEvent[] = MOCKEVENTS;


  public getEvent(id: number): Observable<CalendarEvent> {

    return of(this.events.find(  event => event.id === id));
  }


  public getEvents(from: Date, to: Date): Observable<CalendarEvent[]> {

    return of(
      this.events.filter(event => (event.begin >= from && event.begin < to))
      .sort((a, b) => a.begin.valueOf() - b.begin.valueOf())
    );
  }



  public addEvent(event: CalendarEvent): Observable<CalendarEvent> {

    const lastid = this.events.length;
    event.id = lastid + 1;
    this.events.push(event);
    return of(event);
  }


  public deleteEvent(id: number) {

  }

  public updateEvent(event: CalendarEvent) {

    const index = this.events.findIndex( ev => ev.id === event.id);

    if (index >= 0) {
      this.events[index] = event;
    }

  }



}
