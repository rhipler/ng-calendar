import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MonthViewComponent} from './month-view/month-view.component';
import {WeekViewComponent} from './week-view/week-view.component';
import {DayDetailComponent} from './day-detail/day-detail.component';
import {EditEventComponent} from './edit-event/edit-event.component';


@NgModule({
  declarations: [
    AppComponent,
    MonthViewComponent,
    WeekViewComponent,
    DayDetailComponent,
    EditEventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
