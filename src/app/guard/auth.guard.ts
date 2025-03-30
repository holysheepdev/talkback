import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { count } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  // setTimeout(() => {
  //   console.log(supabase.session);
  // }, 1000);

  // if (!supabase.session) {
  // alert('You need to be logged in to access this page');

  // Redirect to the login page
  // router.navigate(['/signin']);

  // return false;
  // }

  return true;
};
