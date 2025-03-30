import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbars/navbar/navbar.component';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'talkback';
  private supabase = inject(SupabaseService);
  session = this.supabase.session;

  ngOnInit() {
    this.supabase.authChanges((_, session) => {
      this.session = session;
    });
  }
}
