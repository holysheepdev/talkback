import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthSession } from '@supabase/supabase-js';
import { Feedback } from '../../model/Feedback';
import { Router } from '@angular/router';

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
export class AddFeedbackPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private supabase = inject(SupabaseService);
  private router = inject(Router);
  session: AuthSession | null = null;
  loading = false;

  feedbackForm = this.fb.group({
    title: ['', Validators.required],
    feedback: ['', Validators.required],
    anonymous: false,
    company: ['', Validators.required],
    managers: this.fb.array<string>([]),
  });
  currentStep: number = 1;

  async ngOnInit(): Promise<void> {
    // Get the session from the Supabase service
    this.session = await this.supabase.session;
    // Check if the session is null
    if (!this.session) {
      console.error('Session is null. User is not authenticated.');
      return;
    }

    // Initialize the form with one manager control
    // this.feedbackForm.get('managers')?.setValue(['']);
  }
  // Getter to easily access the title control.

  // Getter to easily access the managers FormArray.
  get managers(): FormArray {
    return this.feedbackForm.get('managers') as FormArray;
  }

  // Move to the next step, validating current step controls first.
  nextStep(): void {
    if (this.currentStep === 1) {
      // Validate step 1: Title and Feedback are required.
      if (
        this.feedbackForm.get('title')?.invalid ||
        this.feedbackForm.get('feedback')?.invalid
      ) {
        this.feedbackForm.get('title')?.markAsTouched();
        this.feedbackForm.get('feedback')?.markAsTouched();
        return;
      }
      this.currentStep = 2;
    }
  }
  // Navigate to the previous step.
  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  // Add a new manager control to the managers FormArray.
  addManager(): void {
    this.managers.push(this.fb.control('', Validators.required));
  }

  // Remove a manager control from the FormArray; ensure at least one remains.
  removeManager(index: number): void {
    if (this.managers.length > 1) {
      this.managers.removeAt(index);
    }
  }

  // Submit the feedback form.
  async submitFeedback(): Promise<void> {
    // Mark all fields as touched to trigger validation messages.
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }

    const { user } = await this.session!;
    console.log(user);

    console.log('Feedback submitted:', this.feedbackForm.value);

    // attach user data to the feedback if not anonymous
    const feedbackData: Feedback = {
      ...this.feedbackForm.value,
      title: this.feedbackForm.value.title || '', // Ensure title is a string
      feedback: this.feedbackForm.value.feedback || '', // Ensure feedback is a string
      company: this.feedbackForm.value.company || '', // Ensure company is a string
      managers: (this.feedbackForm.value.managers || []).filter(
        (manager): manager is string => manager !== null
      ), // Ensure managers is an array of strings
      anonymous: this.feedbackForm.value.anonymous ?? true,
      created_by: user.id,
      created_at: new Date().toISOString(),
    };

    // Insert feedback into the database
    this.supabase
      .insertFeedback(feedbackData)
      .then((data) => {
        console.log('Feedback inserted:', data);
        // Reset the form after submission
        this.feedbackForm.reset();
        this.currentStep = 1;
        // Navigate to home
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Error inserting feedback:', error);
      });
  }
}
