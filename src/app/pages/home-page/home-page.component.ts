import { Component, inject, OnInit } from '@angular/core';
import * as quotes from '../../utils/quotes.json';
import { FeedbackDisplayComponent } from '../../components/feedback-display/feedback-display.component';
import { Feedback } from '../../model/Feedback';
import { SupabaseService } from '../../services/supabase.service';

export const sampleFeedbacks: Feedback[] = [
  {
    id: '1',
    title: 'Enhanced Customer Support',
    description: 'The new support system has reduced response times by 50%.',
    company: 'Customer First LLC',
    managers: ['Sarah Connor', 'James Lee'],
    created_at: '2025-03-15T09:00:00Z',
    created_by: 'Emily Davis',
  },
  {
    id: '2',
    title: 'Streamlined Onboarding Process',
    description:
      'The updated onboarding process has improved new hire satisfaction.',
    company: 'HR Solutions Co.',
    managers: ['Michael Brown', 'Laura Wilson'],
    created_at: '2025-03-18T14:45:00Z',
    created_by: 'Chris Martin',
  },
  {
    id: '3',
    title: 'Increased Sales Performance',
    description: 'The sales team exceeded their quarterly targets by 20%.',
    company: 'SalesPro Inc.',
    managers: ['David Clark', 'Sophia Taylor'],
    created_at: '2025-03-22T11:30:00Z',
    created_by: 'Olivia Harris',
  },
  {
    id: '4',
    title: 'Improved IT Infrastructure',
    description:
      'The new cloud-based infrastructure has reduced downtime by 80%.',
    company: 'Tech Innovators Inc.',
    managers: ['Ethan Moore', 'Isabella White'],
    created_at: '2025-03-24T16:00:00Z',
    created_by: 'Liam Thompson',
  },
];

@Component({
  selector: 'app-home-page',
  imports: [FeedbackDisplayComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private supabase = inject(SupabaseService);
  displayQuote: string = 'Hello, {Name}, what a beautiful day!';
  // feedbacks: Feedback[] = sampleFeedbacks;
  feedbacks: Feedback[] = [];

  async ngOnInit(): Promise<void> {
    if (quotes) {
      this.displayQuote =
        quotes.messages[Math.floor(Math.random() * quotes.messages.length)];
      this.displayQuote = this.setName(this.displayQuote, 'Alex');
    }

    // Load feedbacks from Supabase
    let data = await this.supabase.feedbacks(2, 3);
    if (data) {
      this.feedbacks = data;
    }

    console.log(this.supabase.session);
  }

  setName(quote: string, name?: string): string {
    let replaceValue = name ?? 'User';
    return quote.replace('{Name}', replaceValue);
  }
}
