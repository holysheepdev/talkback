import { Component, inject, OnInit } from '@angular/core';
import * as quotes from '../../utils/quotes.json';
import { FeedbackDisplayComponent } from '../../components/feedback-display/feedback-display.component';
import { Feedback } from '../../model/Feedback';
import { SupabaseService } from '../../services/supabase.service';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

export const sampleFeedbacks: Feedback[] = [
  {
    id: '1',
    title: 'Enhanced Customer Support',
    feedback: 'The new support system has reduced response times by 50%.',
    company: 'Customer First LLC',
    managers: ['Sarah Connor', 'James Lee'],
    created_at: '2025-03-15T09:00:00Z',
    created_by: 'Emily Davis',
  },
  {
    id: '2',
    title: 'Streamlined Onboarding Process',
    feedback:
      'The updated onboarding process has improved new hire satisfaction.',
    company: 'HR Solutions Co.',
    managers: ['Michael Brown', 'Laura Wilson'],
    created_at: '2025-03-18T14:45:00Z',
    created_by: 'Chris Martin',
  },
  {
    id: '3',
    title: 'Increased Sales Performance',
    feedback: 'The sales team exceeded their quarterly targets by 20%.',
    company: 'SalesPro Inc.',
    managers: ['David Clark', 'Sophia Taylor'],
    created_at: '2025-03-22T11:30:00Z',
    created_by: 'Olivia Harris',
  },
  {
    id: '4',
    title: 'Improved IT Infrastructure',
    feedback: 'The new cloud-based infrastructure has reduced downtime by 80%.',
    company: 'Tech Innovators Inc.',
    managers: ['Ethan Moore', 'Isabella White'],
    created_at: '2025-03-24T16:00:00Z',
    created_by: 'Liam Thompson',
  },
];

@Component({
  selector: 'app-home-page',
  imports: [FeedbackDisplayComponent, RouterModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private supabase = inject(SupabaseService);
  isLoggedin = false;
  quote$!: Observable<string>;

  // displayQuote: string = 'Hello, {Name}, what a beautiful day!';
  // displayQuoteSubject = new BehaviorSubject<string>(this.displayQuote);
  // displayQuoteObserver = this.displayQuoteSubject.toPromise();

  // feedbacks: Feedback[] = sampleFeedbacks;
  feedbacks: Feedback[] = [];

  async ngOnInit(): Promise<void> {
    try {
      // Get the current session first
      const { data, error: sessionError } = await this.supabase.getSesh();
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        return;
      }
      if (!data?.session || !data.session.user) {
        console.warn('No active session found');
        this.quote$ = of('Log in to get started!');
        return;
      }

      this.isLoggedin = true;

      const { user } = data.session;

      // Get the profile of the authenticated user
      const profile = await this.supabase.profile(user);
      console.log('Profile:', profile);

      this.setupQuote(profile);

      // Load feedbacks for the authenticated user
      let feedbackData: Feedback[] | null = await this.supabase.feedbacks({
        userId: user.id,
      });

      if (feedbackData) {
        this.feedbacks = feedbackData;
      }

      console.log('Supabase session:', this.supabase.session);

      // Listen for authentication changes
      this.supabase.authChanges((event, updatedSession) => {
        console.log('Auth changed:', event, updatedSession);
      });
    } catch (error) {
      console.error('Error initializing home page:', error);
    }
  }

  setName(quote: string, name?: string): string {
    let replaceValue = name ?? 'User';
    return quote.replace('{Name}', replaceValue);
  }

  /**
   * Extracts the logic for picking and formatting a quote.
   * Uses the provided profile to replace the placeholder with the user's name.
   * The result is set to the quote$ observable.
   *
   * @param profile - The user profile containing username data.
   */
  setupQuote(profile: any): void {
    if (quotes && quotes.messages && quotes.messages.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.messages.length);
      let randomQuote = quotes.messages[randomIndex];
      randomQuote = randomQuote.replace(
        '{Name}',
        profile.data?.username ?? 'User'
      );
      // Wrap the final quote in an observable for consumption with the async pipe.
      this.quote$ = of(randomQuote);
    }
  }
}
