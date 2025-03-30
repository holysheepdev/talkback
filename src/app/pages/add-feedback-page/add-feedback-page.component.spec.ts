import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedbackPageComponent } from './add-feedback-page.component';

describe('AddFeedbackPageComponent', () => {
  let component: AddFeedbackPageComponent;
  let fixture: ComponentFixture<AddFeedbackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFeedbackPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeedbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
