import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Feedback } from '../../model/Feedback';
import { SupabaseService } from '../../services/supabase.service';
import { FeedbackDisplayComponent } from '../../components/feedback-display/feedback-display.component';

@Component({
  selector: 'app-feedbacks-dashboard-page',
  imports: [CommonModule, FormsModule, FeedbackDisplayComponent],
  templateUrl: './feedbacks-dashboard-page.component.html',
  styleUrl: './feedbacks-dashboard-page.component.scss',
})
export class FeedbacksDashboardPageComponent {
  supabase = inject(SupabaseService);
  feedbacks: Feedback[] = [];
  loading: boolean = false;

  // Filter fields
  filterCompany: string = '';
  filterPerson: string = '';
  filterManager: string = '';

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  /**
   * Loads feedbacks from the Supabase database.
   * Applies filters if any filter values are provided.
   */
  async loadFeedbacks(): Promise<void> {
    this.loading = true;
    // Build the query using the Supabase client directly.
    // (Since your current feedbacks() method doesn’t support these filters,
    // we use the underlying supabase client to add our own filter conditions.)

    try {
      let feedbackData: Feedback[] | null = await this.supabase.feedbacks({
        filterCompany: this.filterCompany,
        filterManager: this.filterManager,
        filterPerson: this.filterPerson,
      });
      this.feedbacks = feedbackData as Feedback[];
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      this.feedbacks = [];
    } finally {
      this.loading = false;
    }
  }

  /**
   * Called when the user clicks "Apply Filters".
   */
  applyFilters(): void {
    this.loadFeedbacks();
  }

  /**
   * Clears filter inputs and reloads the full list.
   */
  clearFilters(): void {
    this.filterCompany = '';
    this.filterPerson = '';
    this.filterManager = '';
    this.loadFeedbacks();
  }
}
