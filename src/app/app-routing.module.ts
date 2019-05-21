import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MonthViewComponent} from './month-view/month-view.component';
import {WeekViewComponent} from './week-view/week-view.component';

const routes: Routes = [
  {path: '', component: MonthViewComponent},
  {path: 'month', component: MonthViewComponent},
  {path: 'month/:year/:month', component: MonthViewComponent},
  {path: 'week', component: WeekViewComponent},
  {path: 'week/:year/:month/:day', component: WeekViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
