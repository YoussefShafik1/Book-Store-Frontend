import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      this.isAuthenticated = !!token;
    }
  }

  onLogout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      // Refresh the page after removing the token
      window.location.reload();
    }
  }
}
