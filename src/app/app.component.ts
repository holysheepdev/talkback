import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultNavbarComponent } from '../components/navbars/default-navbar/default-navbar.component';
import { LandingNavbarComponent } from '../components/navbars/landing-navbar/landing-navbar.component';
import { NavbarComponent } from '../components/navbars/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'talkback';
}
