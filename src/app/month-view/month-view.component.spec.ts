import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {MonthViewComponent } from './month-view.component';
import {RouterTestingModule} from '@angular/router/testing';
import {DayDetailComponent} from '../day-detail/day-detail.component';

describe('MonthViewComponent', () => {
  let component: MonthViewComponent;
  let fixture: ComponentFixture<MonthViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule ],
      declarations: [ MonthViewComponent, DayDetailComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
