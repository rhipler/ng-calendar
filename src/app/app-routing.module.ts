import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MonthViewComponent} from './month-view/month-view.component';
import {WeekViewComponent} from './week-view/week-view.component';
import {EditEventComponent} from './edit-event/edit-event.component';

const routes: Routes = [
  {path: '', component: MonthViewComponent},
  {path: 'month', component: MonthViewComponent},
  {path: 'month/:year/:month', component: MonthViewComponent},
  {path: 'week', component: WeekViewComponent},
  {path: 'week/:year/:month/:day', component: WeekViewComponent},
  {path: 'event/:id', component: EditEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
