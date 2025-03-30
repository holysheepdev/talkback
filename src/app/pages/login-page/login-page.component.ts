import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { MatButtonModule } from '@angular/material/button';

export class AppModule {}
@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, MatButtonModule],
  providers: [],
  templateUrl: `./login-page.component.html`,
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private formBuilder = inject(FormBuilder);
  private supabase = inject(SupabaseService);

  loading = false;
  signInForm = this.formBuilder.group({
    email: '',
  });

  constructor() {}

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const { error } = await this.supabase.signIn(email);
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }
  }

  async onLog() {
    console.log(await this.supabase.session);
  }

  async onSignOut() {
    try {
      this.loading = true;
      const { error } = await this.supabase.signOut();
      if (error) throw error;
      alert('You have been signed out.');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }
}
