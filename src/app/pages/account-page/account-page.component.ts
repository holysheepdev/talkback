import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthSession, User } from '@supabase/supabase-js';
import { Profile } from '../../model/Profile';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-account-page',
  imports: [ReactiveFormsModule],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss',
})
export class AccountPageComponent implements OnInit, OnDestroy {
  profile!: Profile;
  loading = false;
  private supabase = inject(SupabaseService);
  session!: AuthSession | null;

  updateProfileForm = inject(FormBuilder).group({
    username: '',
    website: '',
    avatar_url: '',
    company: '',
    job_title: '',
    full_name: '',
  });

  constructor() {}

  // Add any additional methods or properties needed for the component
  async ngOnInit(): Promise<void> {
    // get the session from the supabase service
    this.session = await this.supabase.session;
    console.log(this.session);

    await this.getProfile();
    const { username, website, avatar_url, company, job_title, full_name } =
      this.profile;
    // console.log(await this.profile);
    this.updateProfileForm.patchValue({
      username,
      website,
      avatar_url,
      company,
      job_title,
      full_name,
    });
  }
  async getProfile() {
    try {
      this.loading = true;
      const { user } = this.session!;
      const {
        data: profile,
        error,
        status,
      } = await this.supabase.profile(user);
      if (error && status !== 406) {
        throw error;
      }
      if (profile) {
        this.profile = profile;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }
  async updateProfile(): Promise<void> {
    try {
      this.loading = true;
      const { user } = this.session!;
      const username = this.updateProfileForm.value.username as string;
      const website = this.updateProfileForm.value.website as string;
      const avatar_url = this.updateProfileForm.value.avatar_url as string;
      const company = this.updateProfileForm.value.company as string;
      const job_title = this.updateProfileForm.value.job_title as string;
      const full_name = this.updateProfileForm.value.full_name as string;
      const { error } = await this.supabase.updateProfile({
        id: user.id,
        username,
        full_name,
        website,
        avatar_url,
        company,
        job_title,
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }
  async signOut() {
    await this.supabase.signOut();
  }

  ngOnDestroy(): void {
    // Reset the form when the component is destroyed
    this.updateProfileForm.reset();
  }
}
