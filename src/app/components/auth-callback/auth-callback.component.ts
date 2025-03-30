// auth-callback.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
@Component({
  selector: 'app-auth-callback',
  template: `<p>Processing login...</p>`,
})
export class AuthCallbackComponent implements OnInit {
  private supabase = inject(SupabaseService);
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to query parameters from the URL
    this.route.queryParams.subscribe(async (params) => {
      const accessToken = params['access_token'];
      const refreshToken = params['refresh_token'];

      // log the tokens
      // console.log(accessToken, refreshToken);

      if (accessToken && refreshToken) {
        // Option 1: Use setSession if you're manually handling tokens
        const { error } = await this.supabase.setSession(
          accessToken,
          refreshToken
        );

        if (error) {
          console.error('Error setting session:', error);
          // Optionally redirect to an error page or login page
          this.router.navigate(['/signin']);
        } else {
          // Session is set, navigate to a protected route
          this.router.navigate(['/home']);
        }
      } else {
        // console.error('Missing tokens in redirect.');
        // this.router.navigate(['/signin']);
      }
    });
  }
}
