import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './guard/auth.guard';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { AddFeedbackPageComponent } from './pages/add-feedback-page/add-feedback-page.component';

export const routes: Routes = [
  //   { path: 'auth-callback', component: AuthCallbackComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'signin', component: LoginPageComponent },
  { path: 'add-feedback', component: AddFeedbackPageComponent },
];
