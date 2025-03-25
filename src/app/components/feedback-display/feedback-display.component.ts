import { Component, Input, OnInit } from '@angular/core';
import { Feedback } from '../../model/Feedback';

const sampleFeedback: Feedback = {
  id: '1',
  title: 'Improved Team Collaboration',
  description:
    'The new project management tool has significantly improved team collaboration and productivity.',
  company: 'Tech Innovators Inc.',
  managers: ['Alice Johnson', 'Bob Smith'],
  created_at: '2025-03-20T10:30:00Z',
  created_by: 'John Doe',
};

@Component({
  selector: 'app-feedback-display',
  imports: [],
  templateUrl: './feedback-display.component.html',
  styleUrl: './feedback-display.component.scss',
})
export class FeedbackDisplayComponent implements OnInit {
  @Input() feedback: Feedback | undefined;

  ngOnInit(): void {
    if (!this.feedback) {
      this.feedback = sampleFeedback;
    }
  }
}
