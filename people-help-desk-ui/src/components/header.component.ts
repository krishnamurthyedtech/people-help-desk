import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() categorySelected = new EventEmitter<string>();
  @Output() loginClicked = new EventEmitter<void>();
  @Output() signupClicked = new EventEmitter<void>();
  @Output() logoutClicked = new EventEmitter<void>();

  isAuthenticated: boolean = false;
  currentUser: string = '';

  // Navigation items
  navItems = [
    { label: 'Home', category: 'HOME' },
    { label: 'Law', category: 'LAW' },
    { label: 'Finance', category: 'FINANCE' },
    { label: 'Education', category: 'EDUCATION' },
    { label: 'Land', category: 'LAND' },
    { label: 'Health', category: 'HEALTH' }
  ];

  constructor(private router: Router) {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    // Check if user is authenticated from sessionStorage or service
    const userDetails = sessionStorage.getItem('userDetails');
    if (userDetails) {
      this.isAuthenticated = true;
      const user = JSON.parse(userDetails);
      this.currentUser = user.name || user.email || 'User';
    }
  }

  onNavClick(category: string): void {
    this.categorySelected.emit(category);
  }

  onLogin(): void {
    this.loginClicked.emit();
  }

  onSignup(): void {
    this.signupClicked.emit();
  }

  onLogout(): void {
    sessionStorage.removeItem('userDetails');
    this.isAuthenticated = false;
    this.logoutClicked.emit();
    this.router.navigate(['/']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
