import {CalendarEvent} from './calendar-event';

export const MOCKEVENTS: CalendarEvent[] = [
  {id: 1, wholeDay: false, name: 'Event 1', begin: new Date(2019, 4, 24, 7, 30), end: new Date(2019, 4, 24, 13, 30)},
  {id: 2, wholeDay: false, name: 'Event 2', begin: new Date(2019, 4, 24, 10, 30), end: new Date(2019, 4, 24, 16, 0)},
  {id: 3, wholeDay: true, name: 'Event 3', begin: new Date(2019, 4, 23, 0, 0), end: new Date(2019, 4, 23, 0, 0)}
];

