import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-add-feedback-page',
  imports: [ReactiveFormsModule],
  templateUrl: './add-feedback-page.component.html',
  styleUrl: './add-feedback-page.component.scss',
})
export class AddFeedbackPageComponent {
  feedbackForm = inject(FormBuilder).group({
    title: '',
    category: '',
    description: '',
    status: '',
  });
  private supabase = inject(SupabaseService);

  session: any;
  loading = false;
  signOut() {}
  submitFeedback() {}
}
