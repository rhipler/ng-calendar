import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MonthViewComponent} from './month-view/month-view.component';
import {WeekViewComponent} from './week-view/week-view.component';

const routes: Routes = [
  {path: '', component: MonthViewComponent},
  {path: 'monthly', component: MonthViewComponent},
  {path: 'monthly/:year/:month', component: MonthViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
