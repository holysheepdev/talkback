import { Injectable, OnInit } from '@angular/core';
import {
  AuthSession,
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Feedback } from '../model/Feedback';

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
    console.log(this.supabase);
    console.log(this.feedbacks());
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  // async feedbacks() {
  //   let { data, error } = await this.supabase.from('feedbacks').select();
  //   if (error) {
  //     console.error('error', error);
  //     return null;
  //   }
  //   return data;
  // }

  async feedbacks(page?: number, pageSize?: number) {
    let query = this.supabase.from('feedbacks').select();

    if (page !== undefined && pageSize !== undefined) {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query;

    if (error) {
      console.error('error', error);
      return null;
    }
    return data;
  }

  // profile(user: User) {
  //   return this.supabase
  //     .from('profiles')
  //     .select(`username, website, avatar_url`)
  //     .eq('id', user.id)
  //     .single();
  // }
  // authChanges(
  //   callback: (event: AuthChangeEvent, session: Session | null) => void
  // ) {
  //   return this.supabase.auth.onAuthStateChange(callback);
  // }
  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }
  signOut() {
    return this.supabase.auth.signOut();
  }
  // updateProfile(profile: Profile) {
  //   const update = {
  //     ...profile,
  //     updated_at: new Date(),
  //   };
  //   return this.supabase.from('profiles').upsert(update);
  // }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }
  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }
}
