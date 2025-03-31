import { Injectable, OnInit } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Feedback } from '../model/Feedback';
import { Profile } from '../model/Profile';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService implements OnInit {
  private supabase: SupabaseClient;
  private _session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    // console.log(this.feedbacks());
  }

  ngOnInit(): void {
    // console.log(this.supabase);
    // console.log(this.feedbacks());
  }

  get session() {
    this.supabase.auth.getSession().then(({ data, error }) => {
      this._session = data.session;
      // console.log(data);
      // console.log(error);
    });
    return this._session;
  }

  async feedbacks(page?: number, pageSize?: number) {
    let query = this.supabase.from('feedbacks').select();

    if (page !== undefined && pageSize !== undefined) {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query;

    if (error) {
      // console.error('error', error);
      return null;
    }
    return data;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, full_name, company, job_title, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    // log everythign
    // console.log('authChanges');
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + '/talkback' },
    });
  }
  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };
    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }
  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  async getSesh() {
    return await this.supabase.auth.getSession();
  }

  setSession(accessToken: string, refreshToken: string) {
    return this.supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }
}
