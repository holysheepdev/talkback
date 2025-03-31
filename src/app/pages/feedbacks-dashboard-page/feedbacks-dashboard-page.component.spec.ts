import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacksDashboardPageComponent } from './feedbacks-dashboard-page.component';

describe('FeedbacksDashboardPageComponent', () => {
  let component: FeedbacksDashboardPageComponent;
  let fixture: ComponentFixture<FeedbacksDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbacksDashboardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbacksDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
