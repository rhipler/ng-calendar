import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {EditEventComponent } from './edit-event.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('EditEventComponent', () => {
  let component: EditEventComponent;
  let fixture: ComponentFixture<EditEventComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [ EditEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
