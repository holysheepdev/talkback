import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SupabaseService } from '../../../services/supabase.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private supabase = inject(SupabaseService);
  isLoggedIn: any = false;

  async ngOnInit(): Promise<void> {
    const { data, error } = await this.supabase.getSesh();
    this.isLoggedIn = data.session;
    console.log(this.isLoggedIn);
  }
}
