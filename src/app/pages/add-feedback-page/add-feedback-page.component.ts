import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-add-feedback-page',
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './add-feedback-page.component.html',
  styleUrl: './add-feedback-page.component.scss',
})
export class AddFeedbackPageComponent {
  feedbackForm = inject(FormBuilder).group({
    title: '',
    category: '',
    description: '',
    status: '',
    anonymous: true,
  });
  private supabase = inject(SupabaseService);

  session: any;
  loading = false;
  signOut() {}
  submitFeedback() {}
}
