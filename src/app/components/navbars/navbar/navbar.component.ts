import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SupabaseService } from '../../../services/supabase.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatButtonModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private supabase = inject(SupabaseService);
  isLoggedIn: any = false;
  mobileMenuOpen: boolean = false;

  async ngOnInit(): Promise<void> {
    const { data, error } = await this.supabase.getSesh();
    this.isLoggedIn = data.session;
    console.log(this.isLoggedIn);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
