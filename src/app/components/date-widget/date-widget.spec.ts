import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateWidget } from './date-widget';

describe('DateWidget', () => {
  let component: DateWidget;
  let fixture: ComponentFixture<DateWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(DateWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
